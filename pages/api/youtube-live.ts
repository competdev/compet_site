import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

type YoutubeLiveStreamImages = { height: number; width: number; url: string }

type YoutubeLiveStream = {
    name: string
    description: string
    link: string
    images: YoutubeLiveStreamImages[]
    release_date: string
}

/** Cache em memória para evitar esgotar a cota da YouTube Data API a cada visita. */
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutos
let accessToken = ""
let cachedBroadcasts: YoutubeLiveStream[] | null = null
let cacheExpiresAt = 0

async function refreshAccessToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string
): Promise<void> {
    const response = await axios.post("https://oauth2.googleapis.com/token", null, {
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        },
    })
    accessToken = response.data.access_token
}

async function fetchLiveBroadcastsOnce(): Promise<YoutubeLiveStream[]> {
    const axiosInstance = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        headers: { Authorization: `Bearer ${accessToken}` },
    })

    const url = "https://www.googleapis.com/youtube/v3/liveBroadcasts"
    const liveBroadcasts: YoutubeLiveStream[] = []
    let nextPageToken: string | undefined

    const createImageObject = (thumbnail: any): YoutubeLiveStreamImages | null => {
        if (thumbnail?.url) {
            return {
                height: thumbnail.height || 0,
                width: thumbnail.width || 0,
                url: thumbnail.url,
            }
        }
        return null
    }

    do {
        const response: any = await axiosInstance.get(url, {
            params: {
                part: "id,snippet,contentDetails,status",
                mine: true,
                maxResults: 50,
                pageToken: nextPageToken,
            },
        })

        const items = response.data.items ?? []
        const newLiveBroadcasts = items
            .filter(
                (item: any) =>
                    item.snippet?.actualStartTime && item.status?.privacyStatus === "public"
            )
            .map((item: any): YoutubeLiveStream => {
                const thumbnails = [
                    createImageObject(item.snippet.thumbnails?.maxres || {}),
                    createImageObject(item.snippet.thumbnails?.default || {}),
                    createImageObject(item.snippet.thumbnails?.medium || {}),
                    createImageObject(item.snippet.thumbnails?.high || {}),
                    createImageObject(item.snippet.thumbnails?.standard || {}),
                ].filter((image): image is YoutubeLiveStreamImages => image !== null)

                return {
                    description: item.snippet.description,
                    name: item.snippet.title.replace("COMPET Talks:", "COMPET Talks |"),
                    link: `https://www.youtube.com/watch?v=${item.id}`,
                    images: thumbnails,
                    release_date: new Date(item.snippet.actualStartTime).toISOString(),
                }
            })

        liveBroadcasts.push(...newLiveBroadcasts)
        nextPageToken = response.data.nextPageToken
    } while (nextPageToken)

    return liveBroadcasts
}

function isQuotaExceeded(error: any): boolean {
    const code = error.response?.data?.error?.code ?? error.response?.status
    const message: string = error.response?.data?.error?.message ?? ""
    return code === 403 && /quota/i.test(message)
}

function respondWithBroadcasts(res: NextApiResponse, broadcasts: YoutubeLiveStream[]) {
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600")
    return res.status(200).json(broadcasts)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método não permitido" })
    }

    const now = Date.now()
    if (cachedBroadcasts !== null && now < cacheExpiresAt) {
        return respondWithBroadcasts(res, cachedBroadcasts)
    }

    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN
    const clientId = process.env.YOUTUBE_CLIENT_ID
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET

    if (!refreshToken || !clientId || !clientSecret) {
        console.error("Variáveis YOUTUBE_* não configuradas no servidor")
        return respondWithBroadcasts(res, cachedBroadcasts ?? [])
    }

    try {
        if (!accessToken) {
            await refreshAccessToken(clientId, clientSecret, refreshToken)
        }
        try {
            const broadcasts = await fetchLiveBroadcastsOnce()
            cachedBroadcasts = broadcasts
            cacheExpiresAt = now + CACHE_TTL_MS
            return respondWithBroadcasts(res, broadcasts)
        } catch (error: any) {
            if (error.response?.status === 401) {
                await refreshAccessToken(clientId, clientSecret, refreshToken)
                const broadcasts = await fetchLiveBroadcastsOnce()
                cachedBroadcasts = broadcasts
                cacheExpiresAt = now + CACHE_TTL_MS
                return respondWithBroadcasts(res, broadcasts)
            }
            throw error
        }
    } catch (error: any) {
        const youtubeError = error.response?.data || error.message
        console.error("Erro API youtube-live:", youtubeError)

        // Degradação graciosa: não quebra a home com 500 (cota, rede, etc.)
        if (cachedBroadcasts !== null) {
            // Mantém o cache um pouco mais enquanto a API estiver indisponível
            cacheExpiresAt = now + CACHE_TTL_MS
            return respondWithBroadcasts(res, cachedBroadcasts)
        }

        if (isQuotaExceeded(error)) {
            // Evita novas tentativas imediatas que só consomem mais cota
            cachedBroadcasts = []
            cacheExpiresAt = now + CACHE_TTL_MS
            console.warn("Cota YouTube excedida — retornando lista vazia até o cache expirar.")
        }

        return respondWithBroadcasts(res, [])
    }
}
