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
  width: "100%",
});

const useStyles = makeStyles(() => ({
  style: {
    "& .carousel .thumbs-wrapper": {
      margin: 0,
    },
    "& .carousel .thumb": {
      padding: 0,
      opacity: 0.5,
      border: "1px solid #00000073",
    },
    "& .carousel .thumb.selected": {
      border: "2px solid #000",
      padding: 1,
      opacity: 1,
    },
    "& .carousel .slider-wrapper": {
      border: "1px solid #004266a2",
      borderBottom: "3px solid #004266",
      borderRadius: "10px 10px 0px 0px",
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
