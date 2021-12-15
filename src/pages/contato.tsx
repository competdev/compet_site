import Menu from '../components/menu'
import Footer from '../components/footer'

import dynamic from 'next/dynamic'

import styles from '../styles/Contato.module.css'

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

  return (
    <>
      <Menu />
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <Map />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className={styles.text} placeholder="Seu nome" />
          <input type="email" name="email" className={styles.text} placeholder="Seu email" />
          <input type="text" name="subject" className={styles.text} placeholder="Assunto" />
          <input type="text" name="message" className={styles.text} placeholder="Sua mensagem..." />
          <input type="submit" name="submit" className={styles.submit} value="Enviar " />
        </form>
      </div>

      <Footer />
    </>)
}