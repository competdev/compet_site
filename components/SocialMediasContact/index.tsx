import OptimizedImage from "../OptimizedImage"
import { IMAGE_ASSETS } from "../../util/imageAssets"
import styles from "./SocialMediasContact.module.css"

const MEDIA_ICONS = {
    facebook: IMAGE_ASSETS.iconFacebook,
    instagram: IMAGE_ASSETS.iconInstagram,
    twitter: IMAGE_ASSETS.iconTwitter,
    linkedin: IMAGE_ASSETS.iconLinkedin,
} as const

export default function socialMedia({ media_type, text, url }) {
    const type = String(media_type || "").toLowerCase()
    const media_selected = MEDIA_ICONS[type] ?? "https://via.placeholder.com/30"

    return (
        <div>
            <div className={styles.socialMedia}>
                <a className={styles.content} href={url}>
                    <OptimizedImage
                        src={media_selected}
                        alt=""
                        width={60}
                        height={60}
                        sizes="(max-width: 320px) 20px, (max-width: 768px) 25px, 30px"
                    />
                    <p className={styles.text}>/{text}</p>
                </a>
            </div>
        </div>
    )
}
