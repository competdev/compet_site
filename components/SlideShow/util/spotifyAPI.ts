import axios from 'axios';
import { NEXT_URL } from '../../../util/config';

export interface SpotifyShow {
    description: string;
    name: string;
    link: string;
    images: SpotifyImage[];
    release_date: Date;
}

interface SpotifyImage {
    height: number;
    width: number;
    url: string;
}

/**
 * Busca os shows do COMPET através da API route do Next.js
 * Isso resolve o problema de variáveis de ambiente no cliente e uso do Buffer
 */
export const getCompetShows = async (): Promise<SpotifyShow[]> => {
    try {
        const response = await axios.get(`${NEXT_URL}/api/spotify`);
        
        // Converte as datas de string para Date
        const shows: SpotifyShow[] = response.data.map((show: any) => ({
            ...show,
            release_date: new Date(show.release_date),
        }));
        
        return shows;
    } catch (error: any) {
        console.error('Erro ao buscar shows do Spotify:', error.message);
        // Retorna array vazio em caso de erro para não quebrar a aplicação
        return [];
    }
};
