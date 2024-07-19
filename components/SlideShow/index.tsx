import { makeStyles, styled } from "@mui/styles";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./SlideShow.module.css";
import SectionTitle from "../SectionTitle";
const Legend = styled("p")({
    width: "100%",
})

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
            borderBottom: "7px solid #004266",
            borderRadius: "10px 10px 0px 0px",
            border: "1px solid #00000049",
        },
    },
}))

const SlideShow = data => {
    const classes = useStyles()
    return (
        <section id="in-progress" className={styles.slideContainer}>
            <SectionTitle title={"O que temos feito"} />
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
                    {data.dadosSlide.map(data => (
                        <div key={data._id}>
                            <img className={styles.image} src={data.img} />
                            {data.link != "-" ? (
                                <a href={data.link}>
                                    <Legend className={styles.legend}>{data.legenda}</Legend>
                                </a>
                            ) : (
                                <Legend className={styles.legend}>{data.legenda}</Legend>
                            )}
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default SlideShow
