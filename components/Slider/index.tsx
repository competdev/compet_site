import React, { useEffect, useRef, useState } from "react"
import OptimizedImage from "../OptimizedImage"
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

const GAP_PX = 16

const Slider: React.FC<SliderProps> = ({ slides: rawSlides }) => {
    const slides = Array.isArray(rawSlides) ? rawSlides : []
    const viewportRef = useRef<HTMLDivElement>(null)
    const [paused, setPaused] = useState(false)

    const scrollByCard = (direction: 1 | -1) => {
        const viewport = viewportRef.current
        if (!viewport) return

        const card = viewport.querySelector(`.${styles.slide}`) as HTMLElement | null
        const delta = (card?.getBoundingClientRect().width ?? viewport.clientWidth / 3) + GAP_PX
        const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
        if (max <= 4) return

        let next = viewport.scrollLeft + direction * delta
        if (direction > 0 && next > max - 8) next = 0
        if (direction < 0 && next < 8) next = max

        viewport.scrollTo({ left: next, behavior: "smooth" })
    }

    useEffect(() => {
        if (paused || slides.length < 2) return
        const id = window.setInterval(() => scrollByCard(1), 4500)
        return () => window.clearInterval(id)
    }, [paused, slides.length])

    if (!slides.length) {
        return <div className={styles.placeholder} aria-hidden="true" />
    }

    return (
        <div
            className={styles.slider}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollByCard(-1)}
                aria-label="Parceiro anterior"
            >
                <Chevron direction="left" />
            </button>

            <div
                ref={viewportRef}
                className={styles.viewport}
                tabIndex={0}
                aria-label="Carrossel de parceiros"
                onKeyDown={event => {
                    if (event.key === "ArrowRight") {
                        event.preventDefault()
                        scrollByCard(1)
                    }
                    if (event.key === "ArrowLeft") {
                        event.preventDefault()
                        scrollByCard(-1)
                    }
                }}
            >
                {slides.map(({ name, url, imgUrl }, idx) => (
                    <div className={styles.slide} key={`${name}-${idx}`}>
                        <a
                            className={styles.card}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={name}
                        >
                            <span className={styles.logoWrap}>
                                <OptimizedImage
                                    src={imgUrl}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 640px) 80vw, (max-width: 960px) 40vw, 260px"
                                    style={{ objectFit: "contain" }}
                                    priority={idx < 3}
                                />
                            </span>
                        </a>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollByCard(1)}
                aria-label="Próximo parceiro"
            >
                <Chevron direction="right" />
            </button>
        </div>
    )
}

function Chevron({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            focusable="false"
        >
            {direction === "left" ? (
                <path
                    fill="currentColor"
                    d="M15.5 4.5 14 3l-8 9 8 9 1.5-1.5L8.5 12z"
                />
            ) : (
                <path
                    fill="currentColor"
                    d="M8.5 4.5 10 3l8 9-8 9-1.5-1.5L15.5 12z"
                />
            )}
        </svg>
    )
}

export default Slider
