import styles from '../styles/Grupo.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Grupo(dados) {

  return (
    <div>
      <h1>Membros</h1>
      {console.log(dados)}
    </div>
  )
}

Grupo.getInitialProps = async () => {
  const response = await axios.get (
    'http://localhost:3000/api/membros'
  );

  return { dados: response.data }
};