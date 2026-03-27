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

let accessToken = ""

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método não permitido" })
    }

    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN
    const clientId = process.env.YOUTUBE_CLIENT_ID
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET

    if (!refreshToken || !clientId || !clientSecret) {
        console.error("Variáveis YOUTUBE_* não configuradas no servidor")
        return res.status(500).json({
            error: "Credenciais YouTube não configuradas (servidor)",
        })
    }

    try {
        if (!accessToken) {
            await refreshAccessToken(clientId, clientSecret, refreshToken)
        }
        try {
            const broadcasts = await fetchLiveBroadcastsOnce()
            return res.status(200).json(broadcasts)
        } catch (error: any) {
            if (error.response?.status === 401) {
                await refreshAccessToken(clientId, clientSecret, refreshToken)
                const broadcasts = await fetchLiveBroadcastsOnce()
                return res.status(200).json(broadcasts)
            }
            throw error
        }
    } catch (error: any) {
        console.error("Erro API youtube-live:", error.response?.data || error.message)
        return res.status(500).json({
            error: error.response?.data?.error_description || error.message || "Erro YouTube",
        })
    }
}
