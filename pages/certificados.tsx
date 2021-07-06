import axios from 'axios';
export default function Certificados(dados) {
    return (
      <div>
        <h1>Certificados</h1>
        {console.log(dados)}
    </div>
    )
  }

  Certificados.getInitialProps = async () => {
    const response = await axios.get (
      'http://localhost:3000/api/certificados'
    );
  
    return { dados: response.data }
  };