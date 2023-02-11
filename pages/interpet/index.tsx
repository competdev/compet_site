import styles from "./InterPet.module.css";
import axios from "axios";
import { NEXT_URL } from "../../util/config";

import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import AboutCard from "../../components/AboutInterPet";
import CurrEdition from "../../components/CurrEditionInterPet";
import PastEditions from "../../components/PastEditionsInterPet";
import ContactInterPet from "../../components/ContactInterPet";
import Footer from "../../components/Footer";
import ExpedienteInterPet from "../../components/ExpedienteInterPet";
import NormasInterPet from "../../components/NormasInterPet";

InterPet.getInitialProps = async () => {
  const response = await axios.get(NEXT_URL + "/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  const header_img_url = "https://i.ibb.co/KD8ZJRd/interpet.png";
  return (
    <div className={styles.content}>
      <title>COMPET | InterPet</title>
      <Header />
      <PageHeader
        url={header_img_url}
        caption={false}
        sortType={undefined}
        handleSelect={undefined}
      />
      <ExpedienteInterPet />
      <NormasInterPet />
      <AboutCard />
      <CurrEdition dados={dados} />
      <PastEditions elements={dados} />
      <ContactInterPet />
      <Footer />
    </div>
  );
}
