import axios from 'axios';
import env from '../../../env.json'

export interface YoutubeLiveStream {
    name: string,
    description: string,
    link: string,
    images: YoutubeLiveStreamImages[],
    release_date: Date
}

interface YoutubeLiveStreamImages {
    height: number,
    width: number,
    url: string
}

let accessToken = "";
const refreshToken = env.YOUTUBE_REFRESH_TOKEN;
const clientId = env.YOUTUBE_CLIENT_ID;
const clientSecret = env.YOUTUBE_CLIENT_SECRET;

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
});


/**
* Author: pedromelobitencourt
* Function to refresh the access token (that expires every 1h)
*/
async function refreshAccessToken() {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            },
        });

        accessToken = response.data.access_token;
        // Update axios instance with new token
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

/**
 * Author: pedromelobitencourt
 * Returns: Promise<YoutubeLiveStream[]> - An array of COMPET Youtube live streams
 * This function fetches all live broadcasts from the authenticated user's channel.
*/
export const getLiveBroadcasts = async (): Promise<YoutubeLiveStream[]> => {
    const url = `https://www.googleapis.com/youtube/v3/liveBroadcasts`;

    const liveBroadcasts: YoutubeLiveStream[] = [];
    let nextPageToken: string | undefined = undefined;

    try {
        do {
            const response: any = await axiosInstance.get(url, {
                params: {
                    part: 'id,snippet,contentDetails,status',
                    mine: true,
                    maxResults: 50, // Maximum number of items per page
                    pageToken: nextPageToken,
                },
            });

            const createImageObject = (thumbnail: any): YoutubeLiveStreamImages | null => {
                if (thumbnail.url) {
                    return {
                        height: thumbnail.height || 0,
                        width: thumbnail.width || 0,
                        url: thumbnail.url,
                    };
                }
                return null;
            };

            const newLiveBroadcasts = response.data.items
                .filter((item: any) => item.snippet.actualStartTime && item.status.privacyStatus === 'public')
                .map((item: any): YoutubeLiveStream => {
                    const thumbnails = [
                        createImageObject(item.snippet.thumbnails.maxres || {}),
                        createImageObject(item.snippet.thumbnails.default || {}),
                        createImageObject(item.snippet.thumbnails.medium || {}),
                        createImageObject(item.snippet.thumbnails.high || {}),
                        createImageObject(item.snippet.thumbnails.standard || {})
                    ].filter((image): image is YoutubeLiveStreamImages => image !== null); // Filter out null values

                    return {
                        description: item.snippet.description,
                        name: item.snippet.title.replace("COMPET Talks:", "COMPET Talks |"), // To keep the naming pattern
                        link: `https://www.youtube.com/watch?v=${item.id}`,
                        images: thumbnails,
                        release_date: new Date(item.snippet.actualStartTime),
                    };
                });

            liveBroadcasts.push(...newLiveBroadcasts);

            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return liveBroadcasts;
    }
    catch (error: any) {
        if (error.response && error.response.status === 401) { // Token expired
            await refreshAccessToken();
            return getLiveBroadcasts(); // Retry the request
        }
        else {
            console.log(error);
            throw error;
        }
    }
}