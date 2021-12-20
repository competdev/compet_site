import Menu from '../components/menu'
import IgFeed from '../components/instagramFeed'
import Footer from '../components/footer'

import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Menu />
      {renderSocialMedia()}
    </div>
  )
}

const renderSocialMedia = () => {
  return (
    <div className={styles.socialMediaContainer} >
      <IgFeed />
      {/* Colocar componente do Twitter aqui */}
    </div >
  )
}
