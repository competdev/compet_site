import { Card, makeStyles, styled } from "@material-ui/core";
import React, { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/SlideShow.module.css";

interface SlideShowProps {
  imgList: string[];
  txtList: string[];
}

const Legend = styled("p")({
  fontSize: "22px !important",
  width: "100%",
});

const useStyles = makeStyles(() => ({
  style: {
    "& .carousel .thumbs-wrapper": {
      margin: 0,
    },
    "& .carousel .thumb": {
      border: "none",
      padding: 0,
      opacity: 0.5,
    },
    "& .carousel .thumb.selected": {
      border: "2px solid #000",
      padding: 2,
      opacity: 1,
    },
    "& .carousel .slider-wrapper": {
      borderRadius: "10px 10px 0px 0px",
      boxShadow: "180px 180px",
    },
  },
}));

const SlideShow: React.FC<SlideShowProps> = ({ imgList, txtList }) => {
  const classes = useStyles();

  return (
    <div className={styles.slideContainer}>
      <div className={styles.content}>
        <Carousel
          autoPlay
          showIndicators={false}
          className={classes.style}
          showStatus={false}
          infiniteLoop
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
