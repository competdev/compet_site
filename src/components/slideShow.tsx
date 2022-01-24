import { styled } from "@material-ui/core";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/SlideShow.module.css";

interface SlideShowProps {
  imgList: string[];
  txtList: string[];
}

const Legend = styled("p")({
  fontSize: "20px !important",
  margin: 20,
});

const SlideShow: React.FC<SlideShowProps> = ({ imgList, txtList }) => {
  return (
    <div className={styles.slideContainer}>
      <div className={styles.content}>
        <Carousel
          autoPlay
          showStatus={false}
          infiniteLoop
          showArrows={false}
          showThumbs={true}
          thumbWidth={150}
          emulateTouch
        >
          {imgList.map((element, index) => (
            <div>
              <img className={styles.image} src={element} />
              <Legend className={styles.legend}>{txtList[index]}</Legend>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SlideShow;
