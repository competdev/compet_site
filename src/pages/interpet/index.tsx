import axios from "axios";
import styles from "./InterPet.module.css";

import Menu from "../../components/menu";
import PageHeader from '../../components/pageHeader';
import AboutCard from "../../components/aboutCard"
import PrincipalCard from "../../components/principalCard";
import PastEditions from "../../components/pastEditions";
import InterPetContact from "../../components/interPetContact";
import Footer from "../../components/footer";

InterPet.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  const header_img_url = 'https://i.ibb.co/KD8ZJRd/interpet.png'
  return (
    <div className={styles.content}>
      <title>COMPET | InterPet</title>
      <Menu />
      <PageHeader url={header_img_url} caption={false} />
      <AboutCard />
      <PrincipalCard dados={dados} />
      <PastEditions elements={dados} />
      <InterPetContact />
      <Footer />
    </div>
  );
}
