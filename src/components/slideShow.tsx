import { styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";

interface SlideShowProps {
  imgList: string[];
  txtList: string[];
}

const Legend = styled("p")({
  fontSize: "20px !important",
  margin: 20,
});

const SlideShow: React.FC<SlideShowProps> = ({ imgList, txtList }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Carousel autoPlay infiniteLoop width={width * 0.45} showThumbs={false}>
        {imgList.map((element, index) => (
          <div>
            <img src={element} />
            <Legend className='legend'>{txtList[index]}</Legend>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
