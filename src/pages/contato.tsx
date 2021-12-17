import Menu from '../components/menu'
import PageHeader from '../components/pageHeader'
import SectionTitle from '../components/sectionTitle'
import SectionInfo from '../components/sectionInfo'
import SocialMedia from '../components/socialMedia'
import Footer from '../components/footer'

import styles from '../styles/Contato.module.css'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../components/map'), {
  ssr: false
})

export default function Contato() {
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
        console.log('response succeeded')
      }
    }).then(target => {
      console.log(target)
    }).then((error) => {
      console.error(error)
    })

  }

  const sectionTitle = "Contato"
  const sectionInfo = "Entre em contato com a equipe do COMPET através do formulário abaixo ou por meio de uma das redes sociais do grupo listadas logo abaixo. Tentaremos lhe retornar o mais breve possivel."
  const header_img_url = "https://i.ibb.co/MNpsdrb/certificados.png"

  return (
    <div className={styles.pageBody}>
      <Menu />
      <PageHeader url={header_img_url} caption={false} />
      <SectionTitle title={sectionTitle} />
      <SectionInfo info={sectionInfo} />
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <Map />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className={styles.text} placeholder="Seu nome" />
          <input type="email" name="email" className={styles.text} placeholder="Seu email" />
          <input type="text" name="subject" className={styles.text} placeholder="Assunto" />
          <textarea name="message" className={styles.text} placeholder="Sua mensagem..." />
          <input type="submit" name="submit" className={styles.submit} value="Enviar " />
        </form>
      </div>
      <div className={styles.socialMediaArea}>
        <SocialMedia media_type='facebook' text='competcefetmg' url='https://www.facebook.com/competcefetmg/' />
        <SocialMedia media_type='instagram' text='compet.cefet' url='https://www.instagram.com/compet.cefet/' />
        <SocialMedia media_type='twitter' text='compet_cefet' url='https://twitter.com/compet_cefet' />
        <SocialMedia media_type='linkedin' text='competcefetmg' url='https://www.linkedin.com/in/competcefetmg/' />
      </div>
      <Footer />
    </div>
  )
}