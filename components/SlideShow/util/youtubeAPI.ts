import axios from "axios"
import { NEXT_URL } from "../../../util/config"

export interface YoutubeLiveStream {
    name: string
    description: string
    link: string
    images: YoutubeLiveStreamImages[]
    release_date: Date
}

interface YoutubeLiveStreamImages {
    height: number
    width: number
    url: string
}

/**
 * Busca lives públicas do YouTube via rota API (credenciais só no servidor).
 */
export const getLiveBroadcasts = async (): Promise<YoutubeLiveStream[]> => {
    try {
        const response = await axios.get(`${NEXT_URL}/api/youtube-live`)
        if (!Array.isArray(response.data)) {
            return []
        }
        return response.data.map(
            (item: YoutubeLiveStream & { release_date: string }) => ({
                ...item,
                release_date: new Date(item.release_date),
            })
        )
    } catch (error: any) {
        console.error("Erro ao buscar YouTube (API route):", error.message)
        return []
    }
}
