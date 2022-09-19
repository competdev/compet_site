import styles from "./PostHeader.module.css";
interface IPropsHeader {
  src: string;
  alt?: string;
  profileName: string;
}
function PostHeader(props: IPropsHeader) {
  return (
    <div className={styles.header_Container}>
      <div className={styles.profile_Picture}>
        <img src={props.src} alt={props.alt ? props.alt : ""} />
      </div>
      <div className={styles.profile_Name}>
        <p>
          <strong>{props.profileName}</strong>
        </p>
      </div>
    </div>
  );
}

export default PostHeader;
