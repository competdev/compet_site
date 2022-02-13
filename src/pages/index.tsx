import axios from 'axios'
import Menu from "../components/menu";
import IgFeed from "../components/instagramFeed";
import Footer from "../components/footer";
import TwitterFeed from "../components/twitterFeed";
import News from "../components/news";
import About from "../components/about";
import Partners from "../components/partners";

import styles from "../styles/Home.module.css";
import SlideShow from "../components/slideShow";

Home.getInitialProps = async () => {
  const newsResponse = await axios.get("http://localhost:3000/api/news");
  const slideResponse = await axios.get("http://localhost:3000/api/slideShow");
  const partnersResponse = await axios.get("http://localhost:3000/api/parceiros")
  return { dados: newsResponse.data, dadosSlide: slideResponse.data, dadosParceiros: partnersResponse.data }
}

export default function Home({ dados, dadosSlide, dadosParceiros }) {
  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <title>COMPET</title>
      <Menu />
      <SlideShow dadosSlide={dadosSlide}/>
      <About />
      {renderSocialMedia({dados})}
      <Partners data={dadosParceiros}/>
    </div>
    <Footer />
    </div>
  );
}

const renderSocialMedia = ({dados}) => {
  return (
    <div className={styles.socialMediaContainer}>
      <IgFeed />
      <TwitterFeed />
      <News dados={dados}/>
    </div>
  );
};