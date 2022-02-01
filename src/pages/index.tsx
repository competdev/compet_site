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
      <Menu />
      {
        <SlideShow
          imgList={[
            "https://i.ibb.co/fnw1Z5Q/Confraternizacao-2022.png",
            "https://i.ibb.co/fnw1Z5Q/Confraternizacao-2022.png",
            "https://i.ibb.co/fnw1Z5Q/Confraternizacao-2022.png",
            "https://i.ibb.co/fnw1Z5Q/Confraternizacao-2022.png",
          ]}
          txtList={["Grande parte da equipe na confraternização do COMPET realizada no ínicio de 2022.","O COMPET lhe deseja boas festas nesse fim de ano.",
            "Participação do COMPET no InterPET 2016."]}
        />
      }
      <About />
      {renderSocialMedia({ dados })}
      <Footer />
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
