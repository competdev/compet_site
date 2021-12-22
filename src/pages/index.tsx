import Menu from "../components/menu";
import IgFeed from "../components/instagramFeed";
import Footer from "../components/footer";
import TwitterFeed from "../components/twitterFeed";
import News from "../components/news";

import styles from "../styles/Home.module.css";
import SlideShow from "../components/slideShow";

export default function Home() {
  return (
    <div className={styles.container}>
      <Menu />
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
      {renderSocialMedia()}
      <Footer />
    </div>
  );
}

const renderSocialMedia = () => {
  return (
    <div className={styles.socialMediaContainer}>
      <IgFeed />
      <TwitterFeed />
      <News />
    </div>
  );
};
