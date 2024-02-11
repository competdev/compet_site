import axios from "axios"
import styles from "../styles/Index.module.css"
import Header from "../components/Header"
import SlideShow from "../components/SlideShow"
import About from "../components/AboutCOMPET"
import InstagramFeed from "../components/InstagramFeed"
import TwitterFeed from "../components/TwitterFeed"
import YoutubeFeed from "../components/YoutubePlaylistFeed"
import NewsFeed from "../components/NewsFeed"
import Partners from "../components/Partners"
import Footer from "../components/Footer"

import { NEXT_URL } from "../util/config"

Index.getInitialProps = async () => {
    const news = axios.get(NEXT_URL + "/api/news")
    const slide = axios.get(NEXT_URL + "/api/slideShow")
    const partners = axios.get(NEXT_URL + "/api/parceiros")

    const [newsRes, slideRes, partnersRes] = await Promise.all([news, slide, partners])

    return {
        dados: newsRes.data,
        dadosSlide: slideRes.data,
        dadosParceiros: partnersRes.data,
    }
}

export default function Index({ dados, dadosSlide, dadosParceiros }) {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <title>COMPET</title>
                <Header />
                <SlideShow dadosSlide={dadosSlide} />
                <About />
                {renderSocialMediaFeed({ dados })}
                <Partners data={dadosParceiros} />
            </div>
            <Footer />
        </div>
    )
}

const renderSocialMediaFeed = ({ dados }) => {
    return (
        <section className={styles.socialMediaContainer}>
            {<InstagramFeed />}
            <TwitterFeed />
            <YoutubeFeed />
            <NewsFeed dados={dados} />
        </section>
    )
}
