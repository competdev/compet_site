import React, { useState } from "react"
import styles from "./Slider.module.css"

export interface SlideInterface {
    name: string
    url: string
    imgUrl: string
    width: number
    height: number
}

export interface SliderProps {
    slides: SlideInterface[]
    slidesToShow: number
}

const Slider: React.FC<SliderProps> = props => {
    const [pos, setPos] = useState(0)

    if (props.slidesToShow <= 0) throw new Error("slidesToShow prop must be a positive number")

    const pxToShift = (Math.floor(props.slidesToShow) / props.slidesToShow) * 100

    const minLeft = ((props.slidesToShow - props.slides.length) / props.slidesToShow) * 100

    const handleLeftArrowClick = () => {
        setPos(Math.min(0, pos + pxToShift))
    }

    const handleRightArrowClick = () => {
        setPos(Math.max(minLeft, pos - pxToShift))
    }

    return (
        <div
            className={styles.slider}
            style={{ paddingBottom: `${(0.8 / props.slidesToShow) * 100}%` }}
        >
            <div className={styles.sliderContent}>
                <button type="button" className={styles.leftArrow} onClick={handleLeftArrowClick}>
                    {"<"}
                </button>

                <button type="button" className={styles.rightArrow} onClick={handleRightArrowClick}>
                    {">"}
                </button>

                <div className={styles.slidesContainer}>
                    <div className={styles.slides} style={{ left: `${pos}%` }}>
                        {props.slides.map(({ name, url, imgUrl, width, height }, idx) => (
                            <div className={styles.slide} key={idx}>
                                <a href={url}>
                                    <img
                                        src={imgUrl}
                                        alt={name}
                                        style={{ height: `${(height / width) * 100}%` }}
                                    ></img>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider
