import PostHeader from "./PostHeader/PostHeader";
import styles from "./Feed.module.css";
import PostContent from "../PostContent/PostContent";
import { useEffect, useState } from "react";
import axios from "axios";
interface IFeedItem {
  id: string;
  username: string;
  media_url: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption: string;
  timestamp: string;
}
export default function Feedei() {
  const [IfeedList, setIfeedList] = useState<IFeedItem[]>([]);
  async function getInstaFeed() {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
    const fields = "media_url,media_type,permalink,caption,timestamp,username";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;
    const { data } = await axios.get(url).then((res) => {
      return res;
    });
    setIfeedList(data.data);
  }
  useEffect(() => {
    getInstaFeed();
  }, []);
  return (
    <div className={styles.feed_Container}>
      {IfeedList?.map((item, key) => {
        return item.media_type !== "CAROUSEL_ALBUM" ? (
          <div key={key} className={styles.feed_Item}>
            <a
              href="https://instagram.com/compet.cefet"
              target="_blank"
              className={styles.link}
            >
              <PostHeader
                src={
                  "https://i.ibb.co/PY1byp5/Logo-2021-Fundo-Branco-sem-texto.png"
                }
                alt="logo do Compet"
                profileName={item?.username}
              ></PostHeader>
            </a>
            <a href={item?.permalink} target="_blank">
              <PostContent {...item}></PostContent>
            </a>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
}
