import { useEffect, useState } from "react"
import styles from "../../styles/IndexFeeds.module.css"
import SectionTitle from "../SectionTitle"
import axios from "axios"

type YoutubePlaylist = {
    id: string
    snippet: {
        title: string
        channelId: string
        description: string
        thumbnails: {
            standard: {
                height: number
                width: number
                url: string
            }
        }
    }
}

const PlaylistCard = (props: { playlist: YoutubePlaylist }) => {
    const formattedDescription =
        props.playlist.snippet.description.length < 140
            ? props.playlist.snippet.description
            : props.playlist.snippet.description.substring(0, 140) + "..."

    return (
        <a href={`https://www.youtube.com/playlist?list=${props.playlist.id}`} target="_blank">
            <div className={styles.playlistContainer}>
                <div className={styles.playlistData}>
                    <span className={styles.playlistTitle}>{props.playlist.snippet.title}</span>
                    {props.playlist.snippet.description ? (
                        <span className={styles.playlistDescription}>{formattedDescription}</span>
                    ) : null}
                </div>
                <img
                    height={144}
                    width={192}
                    src={props.playlist.snippet.thumbnails.standard.url}
                    alt={props.playlist.snippet.title}
                />
            </div>
        </a>
    )
}

const YoutubeFeed = () => {
    const [playlistData, setPlaylistData] = useState<YoutubePlaylist[]>([] as YoutubePlaylist[])

    const getPlaylists = async () => {
        const url = "https://content-youtube.googleapis.com/youtube/v3/playlists"
        const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "UCeuOOmA8OJcOwyFsUuk8Ccw"
        const key = process.env.YOUTUBE_API_KEY || "AIzaSyBlW9RsUuVwe5Q5jCAEi07unynregYh_jc"
        const part = "snippet,contentDetails"
        const fields = "items(id,snippet(title,channelId,description,thumbnails(standard)))"

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
                    <PlaylistCard playlist={playlist} />
                ))}
            </article>
        </section>
    )
}

export default YoutubeFeed
