import dynamic from 'next/dynamic'
import { useState } from 'react'
import Modal from 'react-modal'
import styles from './Contato.module.css'

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader'
import SectionTitle from '../../components/SectionTitle'
import SectionInfo from '../../components/SectionInfo'
import SocialMediasContact from '../../components/SocialMediasContact'
import Footer from '../../components/Footer'

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false
})

export default function Contato() {
  const [modalOpen, setModalOpen] = useState(false)

  let responseTxt = 'Mensagem enviada com sucesso.'

  function openModal(response) {
    if (!response) {
      responseTxt = 'Falha ao enviar mensagem. Tente novamente.'
    }
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '100px',
      backgroundColor: '#004266',
      color: '#19DD39',
      fontSize: '20px',
      fontFamily: 'Codec Pro Regular',
      borderRadius: '25px',
      backdropColor: 'green',
      borderWidth: 0,
    },
    overlay: {
      zIndex: 1000,
      background: '#00426688',
    }
  };


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      subject: { value: string }
      message: { value: string }
    }

    const name = target.name.value
    const email = target.email.value
    const subject = target.subject.value
    const message = target.message.value

    fetch('/api/contato', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, subject, message })
    }).then((response) => {
      console.log('response received')
      if (response.status === 200) {
        openModal(true)
      }
    }).then(target => {
      console.log(target)
    }).then((error) => {
      console.error(error)
      openModal(false)
    })
  }

  const sectionTitle = "Contato"
  const sectionInfo = "Entre em contato com a equipe do COMPET através do formulário abaixo ou por meio de uma das redes sociais do grupo listadas logo abaixo. Tentaremos lhe retornar o mais breve possivel."
  const header_img_url = "https://i.ibb.co/z8KwzMf/contato.png"

  return (
    <div className={styles.pageBody}>
      <title>COMPET | Contato</title>
      <Header />
      <PageHeader url={header_img_url} caption={false} sortType={undefined} handleSelect={undefined} />
      <SectionTitle title={sectionTitle} />
      <SectionInfo info={sectionInfo}/>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <p>{responseTxt}</p>
      </Modal>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className={styles.text} placeholder="Seu nome" />
          <input type="email" name="email" className={styles.text} placeholder="Seu email" />
          <input type="text" name="subject" className={styles.text} placeholder="Assunto" />
          <textarea name="message" className={styles.text} placeholder="Sua mensagem..." />
          <div className={styles.submitArea}>
            <input type="submit" name="submit" className={styles.submit} value="Enviar " />
          </div>
        </form>
        <div className={styles.mapContainer}>
          <div className={styles.mapAdress}><strong>Sede do COMPET:</strong> Av. Amazonas 7675, Nova Gameleira. Belo Horizonte</div>
          <div className={styles.map}>
            <Map />
          </div>
        </div>

      </div>
      <div className={styles.socialMediaArea}>
        <div className={styles.socialMediaLine1}>
          <SocialMediasContact media_type='facebook' text='competcefetmg' url='https://www.facebook.com/competcefetmg/' />
          <SocialMediasContact media_type='instagram' text='compet.cefet' url='https://www.instagram.com/compet.cefet/' />
        </div>
        <div className={styles.socialMediaLine2}>
          <SocialMediasContact media_type='twitter' text='compet_cefet' url='https://twitter.com/compet_cefet' />
          <SocialMediasContact media_type='linkedin' text='competcefetmg' url='https://www.linkedin.com/in/competcefetmg/' />
        </div>
      </div>
      <Footer />
    </div>
  )
}