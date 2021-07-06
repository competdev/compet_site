import axios from 'axios';
export default function ExMembros(dados) {
    return (
      <div>
        <h1>Ex-Membros</h1>
        {console.log(dados)}
    </div>
    )
  }
  ExMembros.getInitialProps = async () => {
    const response = await axios.get (
      'http://localhost:3000/api/membros'
    );
  
    return { dados: response.data }
  };