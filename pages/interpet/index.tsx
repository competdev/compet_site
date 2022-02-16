import axios from "axios";
import styles from "./InterPet.module.css";

import Header from "../../components/Header";
import PageHeader from '../../components/PageHeader';
import AboutCard from "../../components/AboutInterPet"
import CurrEdition from "../../components/CurrEditionInterPet";
import PastEditions from "../../components/PastEditionsInterPet";
import ContactInterPet from "../../components/ContactInterPet";
import Footer from "../../components/Footer";

InterPet.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  const header_img_url = 'https://i.ibb.co/KD8ZJRd/interpet.png'
  return (
    <div className={styles.content}>
      <title>COMPET | InterPet</title>
      <Header />
      <PageHeader url={header_img_url} caption={false} />
      <AboutCard />
      <CurrEdition dados={dados} />
      <PastEditions elements={dados} />
      <ContactInterPet />
      <Footer />
    </div>
  );
}
