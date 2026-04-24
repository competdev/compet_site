import axios from "axios"

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
        // URL relativa: roda no browser; evita depender de NEXT_PUBLIC_FRONTEND_URL na Vercel
        const response = await axios.get("/api/youtube-live")
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
