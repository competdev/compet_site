import axios from "axios";

import Head from "next/head";
import Header from "../../components/Header";
import AboutCard from "../../components/AboutInterPet";
import CurrEdition from "../../components/CurrEditionInterPet";
import PastEditions from "../../components/PastEditionsInterPet";
import ContactInterPet from "../../components/ContactInterPet";
import Footer from "../../components/Footer";
import ExpedienteInterPet from "../../components/ExpedienteInterPet";
import NormasInterPet from "../../components/NormasInterPet";

const vercelURL = "https://compet.vercel.app";
const localURL = "http://localhost:3000";
const cefetURL = "http://compet.decom.cefetmg.br";

InterPet.getInitialProps = async () => {
  const response = await axios.get(localURL + "/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  return (
    <>
      <Head>
        <title>COMPET | InterPet</title>
      </Head>
      <Header />
      <div style={{padding: '1rem'}}>
        <ExpedienteInterPet />
        <NormasInterPet />
        <AboutCard />
        <CurrEdition dados={dados} />
        <PastEditions elements={dados} />
        <ContactInterPet />
      </div>
      <Footer />
    </>
  );
}
