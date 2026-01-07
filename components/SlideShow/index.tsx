import { makeStyles, styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./SlideShow.module.css";
import cardStyles from "../../styles/MediaCard.module.css";
import SectionTitle from "../SectionTitle";
import { getCompetShows, SpotifyShow } from "./util/spotifyAPI";
import { YoutubeLiveStream, getLiveBroadcasts } from "./util/youtubeAPI";

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
    const [dadosShows, setDadosShows] = useState<(SpotifyShow | YoutubeLiveStream)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //Buscas os conteúdos do Spotfy e do YouTube, ordenando-os por data de lançamento e exibindo somente os 5 mais recentes
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const podcasts = await getCompetShows();
                const youtube = await getLiveBroadcasts().catch(() => []); // Se falhar, retorna array vazio

                const sortedShows = [...podcasts, ...youtube].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
                const topFiveShows = sortedShows.slice(0, 5);
                setDadosShows(topFiveShows);
            } catch (error) {
                console.error('Erro ao buscar dados do SlideShow:', error);
                setDadosShows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtra apenas shows que têm imagens válidas
    const showsComImagens = dadosShows.filter(show => show.images && show.images.length > 0 && show.images[0]?.url);

    return (
        <section id="in-progress" className={styles.slideContainer}>
            <SectionTitle title={"COMPET no Spotify"} />
            <div className={cardStyles.mediaCard}>
                <div className={cardStyles.mediaCardContent}>
                    {loading ? (
                        <div className={cardStyles.mediaCardLoading}>
                            Carregando...
                        </div>
                    ) : showsComImagens.length > 0 ? (
                        <div className={cardStyles.mediaCardFixed}>
                            <Carousel
                                autoPlay
                                showIndicators={false}
                                className={classes.style}
                                showStatus={false}
                                infiniteLoop={showsComImagens.length > 1}
                                showThumbs={showsComImagens.length > 1}
                                thumbWidth={100}
                                emulateTouch
                            >   
                                {/* Exibe os conteúdos do Spotify e do YouTube */}
                                {showsComImagens.map((show, index) => (  
                                    <div key={index}>
                                        {/* O YouTube disponibiliza 4 opções de thumbnail, sendo a na posição 0 a de maior resolução */}
                                        <img className={styles.image} src={show.images[0].url} alt={show.name}/> 
                                        <a href={show.link}><Legend className={styles.legend}> {show.name} </Legend></a>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    ) : (
                        <div className={cardStyles.mediaCardEmpty}>
                            Nenhum conteúdo disponível no momento.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default SlideShow
