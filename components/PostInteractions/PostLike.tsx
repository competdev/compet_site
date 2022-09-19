interface IPostIcon {
  src: string;
  className?: string;
}
function PostLike(props: IPostIcon) {
  return <img src={props.src} className={props.className?props.className:''}/>;
}

export default PostLike;
