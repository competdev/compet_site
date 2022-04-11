import styles from "./Posts.module.css";
import Link from "next/link";

export default function Posts({posts}){
  let slug;
  return (
    <div className={styles.post}>
      {posts.map(post => ( slug = slugTitle(post.attributes.title),
        <div className={styles.postContent} key={post.id}>
          <Link href="/blog/[slug]" as={`/blog/${slug}`}>
            <h2>{post.attributes.title}</h2>
          </Link>
          <p>{post.attributes.description}</p>
        </div>
      ))}
    </ div>
  )
}

function slugTitle(title){
  return title.toLowerCase().replace(/ /g, "-");
}