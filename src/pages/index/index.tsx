import axios from 'axios'
import styles from "./Index.module.css";

import Header from "../../components/Header";
import SlideShow from "../../components/SlideShow";
import About from "../../components/AboutCOMPET";
import InstagramFeed from "../../components/InstagramFeed";
import TwitterFeed from "../../components/TwitterFeed";
import NewsFeed from "../../components/NewsFeed";
import Partners from "../../components/Partners";
import Footer from "../../components/Footer";

Index.getInitialProps = async () => {
  const newsResponse = await axios.get("http://localhost:3000/api/news");
  const slideResponse = await axios.get("http://localhost:3000/api/slideShow");
  const partnersResponse = await axios.get("http://localhost:3000/api/parceiros")
  return { dados: newsResponse.data, dadosSlide: slideResponse.data, dadosParceiros: partnersResponse.data }
}

export default function Index({ dados, dadosSlide, dadosParceiros }) {
  console.log(dadosParceiros)
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
    <div className={styles.socialMediaContainer}>
      <InstagramFeed />
      <TwitterFeed />
      <NewsFeed dados={dados}/>
    </div>
  );
};