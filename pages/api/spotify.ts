import axios from 'axios';
import querystring from 'querystring';
import type { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const competSpotifyShowId = process.env.SPOTIFY_SHOW_ID;
/** Obrigatório na prática para shows/episódios com Client Credentials — sem market muitas vezes vem lista vazia ou 404 */
const spotifyMarket = process.env.SPOTIFY_MARKET?.trim() || "BR";

interface SpotifyShowResponse {
    description: string;
    name: string;
    link: string;
    images: Array<{ height: number; width: number; url: string }>;
    release_date: string; // String porque JSON serializa Date como string
}

/**
 * Obtém o token de acesso do Spotify
 */
async function getAccessToken(): Promise<string> {
    if (!clientId || !clientSecret) {
        throw new Error('SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET devem estar configurados nas variáveis de ambiente');
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify({
        grant_type: 'client_credentials',
    });

    try {
        const response = await axios.post(tokenUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            },
        });

        return response.data.access_token;
    } catch (error: any) {
        console.error('Erro ao obter token do Spotify:', error.message);
        throw new Error('Falha ao autenticar com Spotify API');
    }
}

/**
 * Obtém os episódios do show do Spotify
 */
async function getShows(showId: string, accessToken: string): Promise<SpotifyShowResponse[]> {
    if (!showId) {
        throw new Error('SPOTIFY_SHOW_ID deve estar configurado nas variáveis de ambiente');
    }

    try {
        const marketQs = `market=${encodeURIComponent(spotifyMarket)}`;
        const showUrl = `https://api.spotify.com/v1/shows/${showId}?${marketQs}`;
        const response = await axios.get(showUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        let episodeItems: any[] = response.data.episodes?.items ?? [];
        /** Episódios costumam vir sem `images`; a capa do podcast fica no objeto do show */
        const imagensDoShow: Array<{ height: number; width: number; url: string }> =
            response.data.images ?? [];

        // Com Client Credentials, episódios às vezes só vêm no endpoint dedicado
        if (!episodeItems.length) {
            const episodesUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?${marketQs}&limit=50`;
            const epRes = await axios.get(episodesUrl, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            episodeItems = epRes.data.items ?? [];
        }

        if (!episodeItems.length) {
            return [];
        }

        const shows: SpotifyShowResponse[] = episodeItems.map((episode: any) => {
            const imgs = episode.images;
            const temCapaEpisodio = Array.isArray(imgs) && imgs.length > 0 && imgs[0]?.url;
            return {
                description: episode.description || '',
                name: "Fala COMPET | " + episode.name,
                link: episode.external_urls?.spotify || '',
                images: temCapaEpisodio ? imgs : imagensDoShow,
                release_date: episode.release_date, // Mantém como string para serialização JSON
            };
        });

        return shows;
    } catch (error: any) {
        if (error.response) {
            console.error('Erro na API do Spotify:', error.response.status, error.response.data);
            
            // Se for erro 401, tenta obter novo token e tentar novamente
            if (error.response.status === 401) {
                const newToken = await getAccessToken();
                return getShows(showId, newToken);
            }
        }
        
        console.error('Erro ao buscar shows do Spotify:', error.message);
        return [];
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpotifyShowResponse[] | { error: string }>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        // Verifica se as variáveis de ambiente estão configuradas
        if (!clientId || !clientSecret || !competSpotifyShowId) {
            console.error('Variáveis de ambiente do Spotify não configuradas');
            return res.status(500).json({ 
                error: 'Configuração do Spotify não encontrada. Verifique as variáveis de ambiente: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SHOW_ID' 
            });
        }

        // Obtém o token de acesso
        const accessToken = await getAccessToken();
        
        // Busca os shows
        const shows = await getShows(competSpotifyShowId, accessToken);

        return res.status(200).json(shows);
    } catch (error: any) {
        console.error('Erro na API route do Spotify:', error);
        return res.status(500).json({ 
            error: error.message || 'Erro ao buscar dados do Spotify' 
        });
    }
}

