import { useEffect, useState } from "react"
import styles from "../../styles/IndexFeeds.module.css"
import SectionTitle from "../SectionTitle"
import axios from "axios"

type YoutubePlaylist = {
    // items(id,snippet(title,channelId,description,thumbnails(default)))
    id: string
    snippet: {
        title: string
        channelId: string
        description: string
        thumbnails: {
            medium: {
                height: number
                width: number
                url: string
            }
        }
    }
}

const YoutubeFeed = () => {
    const [playlistData, setPlaylistData] = useState<YoutubePlaylist[]>([] as YoutubePlaylist[])

    const getPlaylists = async () => {
        const url = "https://content-youtube.googleapis.com/youtube/v3/playlists"
        const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "UCeuOOmA8OJcOwyFsUuk8Ccw"
        const key = "AIzaSyBdzzSPKK4vKBzgCp7JUlaR4nJL-a2Qy34"
        const part = "snippet,contentDetails"
        const fields = "items(id,snippet(title,channelId,description,thumbnails(medium)))"

        axios({
            method: "GET",
            url,
            params: {
                key,
                channelId,
                part,
                fields,
            },
        }).then(res => {
            setPlaylistData(res.data.items)
        })
    }

    useEffect(() => {
        getPlaylists()
    }, [])

    return (
        <section id="youtube-playlist-feed">
            <SectionTitle title="Youtube" />
            <article className={styles.socialMediaContainer}>
                {playlistData.map(playlist => (
                    <div style={{ marginBottom: "1rem" }}>
                        <div>{playlist.snippet.title}</div>
                        <img
                            height={playlist.snippet.thumbnails.medium.height}
                            width={playlist.snippet.thumbnails.medium.width}
                            src={playlist.snippet.thumbnails.medium.url}
                            alt={playlist.snippet.title}
                        />
                        {/* <div>{playlist.snippet.description}</div> */}
                    </div>
                ))}
            </article>
        </section>
    )
}

export default YoutubeFeed
