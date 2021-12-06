import axios from "axios";

import Menu from "../components/menu";
import Footer from "../components/footer";
import PrincipalCard from "../components/principalCard";

import styles from "../styles/InterPet.module.css";
import CustomList from "../components/customList";

InterPet.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/interpet");
  return { dados: response.data };
};

export default function InterPet({ dados }) {
  return (
    <>
      <PrincipalCard dados={dados} />
      <CustomList elements={dados} />
    </>
  );
}
