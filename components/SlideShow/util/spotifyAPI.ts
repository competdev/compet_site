import axios from 'axios';
import querystring from 'querystring';
import env from '../../../env.json'

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const competSpotifyShowId = env.SPOTIFY_SHOW_ID;

let accessToken: string = "";

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
 * Author: pedromelobitencourt
 * Returns: Promise<string> - The access token for Spotify API. It has 1h duration.
*/
export const getAccessToken = async (): Promise<string> => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify({
        grant_type: 'client_credentials',
    });

    const response = await axios.post(tokenUrl, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
    });

    return accessToken = response.data.access_token;
};

/**
 * Author: pedromelobitencourt
 * Returns: Promise<SpotifyShow[]> - An array of Spotify shows
*/
export const getShows = async (showId: string): Promise<SpotifyShow[]> => {
    try {
        const searchUrl = `https://api.spotify.com/v1/shows/${showId}`;
        const response = await axios.get(searchUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const shows: SpotifyShow[] = response.data.episodes.items.map((episode: any) => ({
            description: episode.description,
            name: "Fala COMPET | " + episode.name, // To keep the naming pattern
            link: episode.external_urls.spotify,
            images: episode.images,
            release_date: new Date(episode.release_date),
        }));
        return shows;
    }
    catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            console.log('Unauthorized: Access token expired or invalid');
            accessToken = await getAccessToken();
            return getShows(showId);
        }
        else {
            console.log('An error occurred spotify API:', error.message);
            console.log(error)
            return [];
        }
    }
};

/**
 * Author: pedromelobitencourt
 * Returns: Promise<SpotifyShow[]> - An array of Spotify shows
*/
export const getCompetShows = async (): Promise<SpotifyShow[]> => {
    const competShows = getShows(competSpotifyShowId);
    return competShows;
}

// Por algum motivo, está retornando status 401 (acho que é erro da API do Spotify)
export const fetchCurrentUserShowId = async (): Promise<any> => {
    console.log('A');
    try {
        const searchUrl = 'https://api.spotify.com/v1/me';
        const response = await axios.get(searchUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error: any) {
        console.log('An error occurred:', error.message);
        return "";
    }
};
