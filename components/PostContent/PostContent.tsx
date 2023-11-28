import styles from "./PostContent.module.css"
import PostLike from "../PostInteractions/PostLike"
interface IPropsPostContent {
    username: string
    media_url: string
    permalink: string
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
    caption: string
    timestamp: string
}
function PostContent(props: IPropsPostContent) {
    const date = new Date(props.timestamp).toLocaleDateString()
    return (
        <div className={styles.post_Container}>
            <div className={styles.post_Media}>
                {props.media_type == "IMAGE" ? (
                    <img src={props.media_url} />
                ) : (
                    <video controls>
                        <source src={props.media_url} />
                    </video>
                )}
            </div>
            <div className={styles.post_Interactions}>
                <div className={styles.icon}>
                    <PostLike src={"/like.svg"} className={styles.like} />
                </div>
                <div className={styles.chat}>
                    <PostLike src={"/comment.svg"} className={styles.like} />
                </div>
                <div className={styles.chat}>
                    <PostLike src={"/share.png"} className={styles.like} />
                </div>
                <div className={styles.save}>
                    <div className={styles.icon}>
                        <PostLike src={"/save.svg"} className={styles.like} />
                    </div>
                </div>
            </div>
            <div className={styles.caption}>
                <p>
                    <strong>{props.username}</strong> {props.caption}
                </p>
            </div>
            <div className={styles.date}>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default PostContent
