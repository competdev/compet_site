import axios from 'axios'
import Menu from "../components/menu";
import IgFeed from "../components/instagramFeed";
import Footer from "../components/footer";
import TwitterFeed from "../components/twitterFeed";
import News from "../components/news";
import About from "../components/about";

import styles from "../styles/Home.module.css";
import SlideShow from "../components/slideShow";

Home.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/news");
  return { dados: response.data }
}

export default function Home({ dados }) {
  return (
    <div className={styles.container}>

      {
        <SlideShow
          imgList={[
            "https://i.ibb.co/dpVVZnq/Boas-Festas.png",
            "https://i.ibb.co/gggcn4J/img-Preenchendo.png",
          ]}
          txtList={["O COMPET lhe deseja boas festas nesse fim de ano.",
            "Participação do COMPET no InterPET 2016."]}
        />
      }
      <About />
      {renderSocialMedia({ dados })}


    </div>
  );
}

const renderSocialMedia = (dados) => {
  return (
    <div className={styles.socialMediaContainer}>
      <IgFeed />
      <TwitterFeed />
      <News dados={dados} />
    </div>
  );
};
