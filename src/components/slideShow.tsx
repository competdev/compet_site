import { styled } from "@material-ui/core";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/SlideShow.module.css";
import wSize from "../util/windowSize"

interface SlideShowProps {
  imgList: string[];
  txtList: string[];
}

const Legend = styled("p")({
  fontSize: "20px !important",
  margin: 20,
});

const SlideShow = ({ imgList, txtList }) => {
  return (

    <div className={styles.slideContainer}>
      <div className={styles.content}>
        <Carousel dynamicHeight={true} autoPlay showStatus={false} centerMode infiniteLoop width={wSize().width * 0.55} showThumbs={false}>
          {imgList.map((element, index) => (
            <div>
              <img src={element} />
              <Legend className={styles.legend}>{txtList[index]}</Legend>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SlideShow;
