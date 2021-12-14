import axios from "axios";
import Contact from "../components/contact";

import Footer from "../components/footer";
import PrincipalCard from "../components/principalCard";

import styles from "../styles/InterPet.module.css";
import PastEditions from "../components/pastEditions";

InterPet.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  return (
    <div className={styles.content}>
      <PrincipalCard dados={dados} />
      <PastEditions elements={dados} />
      <Contact></Contact>
      <Footer />
    </div>
  );
}
