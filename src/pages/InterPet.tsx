import axios from "axios";

import Menu from "../components/menu";
import Footer from "../components/footer";
import PrincipalCard from "../components/principalCard";
import AboutCard from "../components/aboutCard"

import styles from "../styles/InterPet.module.css";
import PastEditions from "../components/pastEditions";

InterPet.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  return (
    <>
      <AboutCard/>
      <PrincipalCard dados={dados} />
      <PastEditions elements={dados} />
      

    </>
  );
}
