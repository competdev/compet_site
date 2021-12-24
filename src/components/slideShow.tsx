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
          dynamicHeight={true} autoPlay showStatus={false} infiniteLoop showThumbs={false} emulateTouch
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
              <button type="button" onClick={onClickHandler} title={label} className={styles.arrow} style={{ left: 0 }}>
                {'<'}
              </button>
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
              <button type="button" onClick={onClickHandler} title={label} className={styles.arrow} style={{ right: 0 }}>
                {'>'}
              </button>
          }
        >
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
