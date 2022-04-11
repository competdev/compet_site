import styles from "./Blog.module.css";

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader';
import SearchBox from '../../components/SearchBox';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/Footer';

export default function Blog(){
  const header_img_url = "https://i.ibb.co/MNpsdrb/certificados.png"
  return(
    <div className={styles.page}>
      <title>COMPET | Blog</title>
      <Header />
      <PageHeader url={header_img_url} caption={false} />
      <div className={styles.blogContent}>
        
      </div>
      <Footer />
    </div>
  )  
}