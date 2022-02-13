import axios from 'axios'
import styles from "./Index.module.css";

import Menu from "../../components/menu";
import SlideShow from "../../components/slideShow";
import About from "../../components/about";
import IgFeed from "../../components/instagramFeed";
import TwitterFeed from "../../components/twitterFeed";
import News from "../../components/news";
import Partners from "../../components/partners";
import Footer from "../../components/footer";

Index.getInitialProps = async () => {
  const newsResponse = await axios.get("http://localhost:3000/api/news");
  const slideResponse = await axios.get("http://localhost:3000/api/slideShow");
  const partnersResponse = await axios.get("http://localhost:3000/api/parceiros")
  return { dados: newsResponse.data, dadosSlide: slideResponse.data, dadosParceiros: partnersResponse.data }
}

export default function Index({ dados, dadosSlide, dadosParceiros }) {
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