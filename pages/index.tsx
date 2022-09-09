import axios from 'axios'
import styles from "../styles/Index.module.css";

import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import About from "../components/AboutCOMPET";
import InstagramFeed from "../components/InstagramFeed";
import TwitterFeed from "../components/TwitterFeed";
import NewsFeed from "../components/NewsFeed";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

const vercelURL = "https://compet.vercel.app"
const localURL = "http://localhost:3000"
const cefetURL = "http://compet.decom.cefetmg.br"

Index.getInitialProps = async () => {
  const newsResponse = await axios.get(localURL + "/api/news");
  const slideResponse = await axios.get(localURL + "/api/slideShow");
  const partnersResponse = await axios.get(localURL + "/api/parceiros")
  return { dados: newsResponse.data, dadosSlide: slideResponse.data, dadosParceiros: partnersResponse.data }
}

export default function Index({ dados, dadosSlide, dadosParceiros }) {
  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <title>COMPET</title>
      <Header />
      <SlideShow dadosSlide={dadosSlide}/>
      <About />
      {renderSocialMediaFeed({dados})}
      <Partners data={dadosParceiros}/>
    </div>
    <Footer />
    </div>
  );
}

const renderSocialMediaFeed = ({dados}) => {
  return (
    <section className={styles.socialMediaContainer}>
      {/*<InstagramFeed />*/}
      <TwitterFeed />
      <NewsFeed dados={dados}/>
    </section>
  );
};