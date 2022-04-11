import axios from 'axios';
import { useState } from 'react'
import styles from './ExMembros.module.css'
import React, { MouseEvent } from 'react';

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader'
import SectionTitle from '../../components/SectionTitle'
import MemberCard from '../../components/MembersCard'
import Footer from '../../components/Footer'
import renderTutores from '../../pages/exmembros';



const socialNetworks = false;
const vercelURL = "https://compet.vercel.app"
const localURL = "http://localhost:3000"
const cefetURL = "http://compet.decom.cefetmg.br"


    
     export default function Az(member1, member2) {
      if (member1.nome < member2.nome)
        return -1;
      if (member1.nome > member2.nome)
        return 1;
      return 0;
    }
    export function Za(member1, member2) {
      if (member1.nome < member2.nome)
        return 1;
      if (member1.nome > member2.nome)
        return -1;
      return 0;
    }
    
  
  
  



