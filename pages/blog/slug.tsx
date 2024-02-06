// import axios from 'axios';
// import MarkdownIt from 'markdown-it';
// import styles from "./PostSlug.module.css";

// import Header from '../../components/Header'
// import Footer from '../../components/Footer';

// const BLOG_API_URL = 'https://compet-blog.herokuapp.com/api/posts/';

// export default function PostPage({ post }){
//   const md = new MarkdownIt({
//     html: true,
//   });
//   const htmlContent = md.render(post.attributes.content);

//   return (
//     <div className={styles.content}>
//       <Header />
//       <div className={styles.post}>
//         <header className={styles.header}>
//           <div className={styles.title}>{post.attributes.title}</div>
//           <div className={styles.description}>{post.attributes.description}</div>
//           <div className={styles.separator}></div>
//           <div className={styles.dateAndAuthor}> Postado por: <b>{post.attributes.author}</b> em <em>{post.attributes.date}</em></div>
//         </header>
//         <section className={styles.content} dangerouslySetInnerHTML={{__html: htmlContent}}></section>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export async function getStaticProps({ params }) {
//   let postId;
//   const postsRes = await axios.get(BLOG_API_URL);
//   const slugAndIds = postsRes.data.data.map(post => {
//     if(slugTitle(post.attributes.title) === params.slug){
//       postId = post.id;
//     }
//   });

//   const postRes = await axios.get(BLOG_API_URL + postId);

//   return {
//     props: {
//       post: postRes.data.data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const postsRes = await axios.get(BLOG_API_URL);
//   const paths = postsRes.data.data.map(post => {
//     return {
//       params : {
//         slug: slugTitle(post.attributes.title),
//       }
//     }
//   });

//   return {
//     paths,
//     fallback: false,
//   }
// }

// function slugTitle(title){
//   return title.toLowerCase().replace(/ /g, "-").toString();
// }

export default function PostPage() {
    return <div>Under construction</div>
}
