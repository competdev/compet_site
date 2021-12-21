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
     { /*<Menu /> */}
      {renderSocialMedia()}
      {/*
        <SlideShow
          imgList={[
            "https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?size=626&ext=jpg",
            "https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?size=626&ext=jpg",
            "https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?size=626&ext=jpg",
            "https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?size=626&ext=jpg",
          ]}
          txtList={["Teste1", "Teste2", "Teste3", "Teste4"]}
        />
        */}
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
