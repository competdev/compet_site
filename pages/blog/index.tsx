import axios from "axios";
import removeAccents from 'remove-accents';
import { useState } from 'react'
import styles from "./Blog.module.css";

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader';
import SearchBox from '../../components/SearchBox';
import Posts from '../../components/Posts';
import Footer from '../../components/Footer';

const BLOG_API_URL = 'https://compet-blog.herokuapp.com/api/posts?populate=thumb';

export default function Blog({ posts }){
  const header_img_url = "https://i.ibb.co/tDjGdZP/blog.png";
  const [query, setQuery] = useState("")
  function postsSearch(posts){
    if(byTitle(posts)){
        return posts;
      } 
  function byTitle(posts){
        return removeAccents(posts.attributes.title.toLowerCase()).includes(query.toLowerCase())
      }
    }
  return(
      <div className={styles.page}>
      <title>COMPET | Blog</title>
      <Header />
      <PageHeader url={header_img_url} caption={false} />
      <div className={styles.searchContainer}>
        <SearchBox placeholder="Pesquisar postagens" setQuery={setQuery} />
      </div>
      <div className={styles.blogContent}>
        <Posts posts = {posts} />
      </div>
      <Footer />
    </div>
  )  
}

export async function getStaticProps(){
  let postsRes = await axios.get(BLOG_API_URL);
  postsRes.data.data.sort((a, b) => {
    return Number(new Date(b.attributes.createdAt)) - Number(new Date(a.attributes.createdAt));
  });

  return {
    props: {
      posts: postsRes.data.data,
    },
  };
}
