import styles from "./SocialMediasContact.module.css"

export default function socialMedia({ media_type, text, url }) {
    const facebook_logo = "https://i.ibb.co/mT4S0S9/facebook-icon.png"
    const instagram_logo = "https://i.ibb.co/61Y0dqL/instagram-icon.png"
    const twitter_logo = "https://i.ibb.co/Zfb5rRR/twitter-icon.png"
    const linkedIn_logo = "https://i.ibb.co/cvRb3nZ/linkedin-icon.png"
    const placeHolder = "https://via.placeholder.com/30"

    let media_selected = ""

    media_type.toLowerCase()

    if (media_type == "facebook") {
        media_selected = facebook_logo
    } else if (media_type == "instagram") {
        media_selected = instagram_logo
    } else if (media_type == "twitter") {
        media_selected = twitter_logo
    } else if (media_type == "linkedin") {
        media_selected = linkedIn_logo
    } else {
        media_selected = placeHolder
    }

    return (
        <div>
            <div className={styles.socialMedia}>
                <a className={styles.content} href={url}>
                    <img src={media_selected} alt="" />
                    <p className={styles.text}>/{text}</p>
                </a>
            </div>
        </div>
    )
}
