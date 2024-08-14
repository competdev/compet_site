import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import removeAccents from "remove-accents"
import { makeStyles } from "@mui/styles"
import styles from "./Manual.module.css"
import { NEXT_URL } from "../../util/config"
import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import SearchBox from "../../components/SearchBox"
import ReactPaginate from "react-paginate"
import Footer from "../../components/Footer"

const useStyles = makeStyles(theme => ({
    pagination: {
        listStyle: "none",
        fontSize: "17px",
        display: "flex",
        paddingLeft: "0px",
        justifyContent: "center",
    },
    page_link: {
        fontWeight: "bold",
        display: "flex",
        position: "relative",
        color: "#004266",
        textDecoration: "none",
        border: "1px solid #d8d9da",
        backgroundColor: "#fff",
        padding: ".555rem .795rem",
        transition:
            "color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out",
        "&:hover": {
            color: "#0a58ca",
            backgroundColor: "#e9ecef",
            borderColor: "#99999984",
        },
    },
    page_prev: {
        border: "1px solid #d8d9da",
        backgroundColor: "#fff",
        padding: ".555rem .795rem",
        borderTopLeftRadius: "50px",
        borderBottomLeftRadius: "50px",
        "&:hover": {
            color: "#0a58ca",
            backgroundColor: "#e9ecef",
            borderColor: "#99999984",
        },
    },
    page_next: {
        border: "1px solid #d8d9da",
        backgroundColor: "#fff",
        padding: ".555rem .795rem",
        borderTopRightRadius: "50px",
        borderBottomRightRadius: "50px",
        "&:hover": {
            color: "#0a58ca",
            backgroundColor: "#e9ecef",
            borderColor: "#99999984",
        },
    },
    activeLink: {
        border: "1px solid #0a58ca",
    },
}))

export default function Manual() {
    const header_img_url = "https://i.ibb.co/0BY1q2k/Help.png"

    return (
        <div className={styles.pageContent}>
            <title>COMPET | Manual do Calouro</title>
            <Header />
            <PageHeader
                url={header_img_url}
                caption={false}
                sortType={undefined}
                handleSelect={undefined}
            />

            <body>
                <div className={styles.container}>
                    <div className={styles.card__container}>
                        <article className={styles.card__article}>
                            {/* <img
                                src="https://i.ibb.co/0BY1q2k/Help.png"
                                alt="image"
                                className="card__img"
                            ></img> */}

                            {/* <div className={styles.card__data}> */}
                                <span className={styles.card__description}>
                                    Calendario CEFET
                                </span>
                                <h2 className={styles.card__title}>2024.1</h2>
                                <a
                                    href="https://www.dirgrad.cefetmg.br/dirgrad/calendario"
                                    className={styles.card__button}>
                                    Acesse o calendario
                                </a>
                            {/* </div> */}
                        </article>
                    </div>
                </div>
            </body>

            <Footer />
        </div>
    )
}
