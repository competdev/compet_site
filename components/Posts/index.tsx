import styles from "./Posts.module.css";
import Link from "next/link";

export default function Posts({posts}){
  const apiURL = 'https://compet-blog.herokuapp.com';
  let slug;
  return (
    <div className={styles.post}>
      {posts.map(post => ( slug = slugTitle(post.attributes.title),
        <div className={styles.postContent} key={post.id}>
          <div className={styles.thumbnail}>
            <Link href="/blog/[slug]" as={`/blog/${slug}`}>
              <img src={apiURL + post.attributes.thumb.data.attributes.url} alt={post.attributes.title} />
            </Link>
          </div>
          <div className={styles.contentBlock}>
            <Link href="/blog/[slug]" as={`/blog/${slug}`}>
              <h2>{post.attributes.title}</h2>
            </Link>
            <p className={styles.dateAndAuthor}>{post.attributes.date} - Postador por: <b>{post.attributes.author}</b></p>
            <p className={styles.description}>{post.attributes.description}</p>
          </div>
        </div>
      ))}
    </ div>
  )
}

function slugTitle(title){
  return title.toLowerCase().replace(/ /g, "-");
}