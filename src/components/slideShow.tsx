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
  },
}));

const SlideShow: React.FC<SlideShowProps> = ({ imgList, txtList }) => {
  const classes = useStyles();

  return (
    <Card className={styles.slideContainer}>
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
    </Card>
  );
};

export default SlideShow;
