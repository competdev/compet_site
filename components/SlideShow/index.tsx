import { makeStyles, styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./SlideShow.module.css";
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

    //Buscas os conteúdos do Spotfy e do YouTube, ordenando-os por data de lançamento e exibindo somente os 5 mais recentes
    useEffect(() => {
        const fetchData = async () => {
            const podcasts = await getCompetShows();
            const youtube = await getLiveBroadcasts();

            const sortedShows = [...podcasts, ...youtube].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
            const topFiveShows = sortedShows.slice(0, 5);
            setDadosShows(topFiveShows);
        };

        fetchData();
    }, []);

    return (
        <section id="in-progress" className={styles.slideContainer}>
            <SectionTitle title={"O que temos feito"} />
            <div className={styles.content}>
                <Carousel
                    autoPlay
                    showIndicators={false}
                    className={classes.style}
                    showStatus={false}
                    infiniteLoop //TODO: Verificar se é necessário, pois está causando erros na imagem inicial
                    showThumbs={true}
                    thumbWidth={150}
                    emulateTouch
                >   
                    {/* Exibe os conteúdos do Spotify e do YouTube */}
                    {dadosShows.map((show, index) => (  
                        <div key={index}>
                            {/* O YouTube disponibiliza 4 opções de thumbnail, sendo a na posição 0 a de maior resolução */}
                            <img className={styles.image} src={show.images[0].url}/> 
                            <a href={show.link}><Legend className={styles.legend}> {show.name} </Legend></a>
                        </div>
                    ))}
                    
                </Carousel>
            </div>
        </section>
    );
}

export default SlideShow
