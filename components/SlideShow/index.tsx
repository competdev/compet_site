import React, { useEffect, useState } from "react"
import styles from "./SlideShow.module.css"
import cardStyles from "../../styles/MediaCard.module.css"
import SectionTitle from "../SectionTitle"
import OptimizedImage from "../OptimizedImage"
import { DEFAULT_PHOTO, pickDisplayImage } from "../../util/imageAssets"
import { YoutubeLiveStream, getLiveBroadcasts } from "./util/youtubeAPI"

const AUTO_MS = 6000

const SlideShow = () => {
    const [dadosShows, setDadosShows] = useState<YoutubeLiveStream[]>([])
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const youtube = await getLiveBroadcasts().catch(() => [])
                const sortedShows = [...youtube].sort(
                    (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                )
                setDadosShows(sortedShows.slice(0, 5))
                setActive(0)
            } catch (error) {
                console.error("Erro ao buscar dados do SlideShow:", error)
                setDadosShows([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const shows = dadosShows
        .filter(show => Boolean(show.link))
        .map(show => {
            const display = pickDisplayImage(show.images, 640)
            return {
                ...show,
                thumb: {
                    url: display.url || DEFAULT_PHOTO,
                    width: display.width,
                    height: display.height,
                },
            }
        })

    const total = shows.length

    const goTo = (index: number) => {
        if (!total) return
        setActive((index + total) % total)
    }

    useEffect(() => {
        if (paused || total < 2) return
        const id = window.setInterval(() => {
            setActive(current => (current + 1) % total)
        }, AUTO_MS)
        return () => window.clearInterval(id)
    }, [paused, total])

    const current = shows[active]

    return (
        <section id="in-progress" className={styles.slideContainer}>
            <SectionTitle title={"COMPET no YouTube"} />
            <div className={`${cardStyles.mediaCard} ${styles.youtubeCard}`}>
                <div className={`${cardStyles.mediaCardContent} ${styles.youtubeContent}`}>
                    {loading ? (
                        <div className={cardStyles.mediaCardLoading}>Carregando...</div>
                    ) : current ? (
                        <div
                            className={styles.player}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onFocusCapture={() => setPaused(true)}
                            onBlurCapture={() => setPaused(false)}
                            onKeyDown={event => {
                                if (event.key === "ArrowRight") {
                                    event.preventDefault()
                                    goTo(active + 1)
                                }
                                if (event.key === "ArrowLeft") {
                                    event.preventDefault()
                                    goTo(active - 1)
                                }
                            }}
                        >
                            <div className={styles.stage}>
                                <a
                                    className={styles.frame}
                                    href={current.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Assistir no YouTube: ${current.name}`}
                                >
                                    <span className={styles.imageWrap}>
                                        <OptimizedImage
                                            className={styles.image}
                                            src={current.thumb.url}
                                            alt={current.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 560px"
                                            style={{ objectFit: "cover" }}
                                            priority
                                        />
                                    </span>
                                </a>
                            </div>

                            <div className={styles.meta}>
                                <p className={styles.videoTitle}>{current.name}</p>
                                <p className={styles.videoMeta}>
                                    {formatReleaseDate(current.release_date)}
                                    <span aria-hidden="true"> · </span>
                                    <a
                                        className={styles.watchLink}
                                        href={current.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Assistir no YouTube
                                    </a>
                                </p>
                            </div>

                            {total > 1 ? (
                                <div className={styles.controls}>
                                    <button
                                        type="button"
                                        className={styles.arrow}
                                        onClick={() => goTo(active - 1)}
                                        aria-label="Vídeo anterior"
                                    >
                                        <Chevron direction="left" />
                                    </button>
                                    <div className={styles.dots} role="tablist" aria-label="Vídeos do COMPET">
                                        {shows.map((show, index) => (
                                            <button
                                                key={`${show.link}-${index}`}
                                                type="button"
                                                role="tab"
                                                aria-selected={index === active}
                                                aria-label={`Mostrar vídeo ${index + 1}: ${show.name}`}
                                                className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
                                                onClick={() => goTo(index)}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.arrow}
                                        onClick={() => goTo(active + 1)}
                                        aria-label="Próximo vídeo"
                                    >
                                        <Chevron direction="right" />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div className={cardStyles.mediaCardEmpty}>
                            Nenhum conteúdo disponível no momento.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

function formatReleaseDate(value: Date | string | undefined) {
    const date = value instanceof Date ? value : value ? new Date(value) : null
    if (!date || Number.isNaN(date.getTime())) return "YouTube"
    return date.toLocaleDateString("pt-BR")
}

function Chevron({ direction }: { direction: "left" | "right" }) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            {direction === "left" ? (
                <path fill="currentColor" d="M15.5 4.5 14 3l-8 9 8 9 1.5-1.5L8.5 12z" />
            ) : (
                <path fill="currentColor" d="M8.5 4.5 10 3l8 9-8 9-1.5-1.5L15.5 12z" />
            )}
        </svg>
    )
}

export default SlideShow
