import Menu from '../components/menu'
import Footer from '../components/footer'

import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Menu />
      <Footer />
    </div>
  )
}
