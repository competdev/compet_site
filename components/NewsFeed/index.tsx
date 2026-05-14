import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import styles from '../../styles/IndexFeeds.module.css'
import cardStyles from '../../styles/MediaCard.module.css'

import SectionTitle from "../SectionTitle"

const useStyles = makeStyles(theme => ({
    pagination: {
        listStyle: "none",
        fontSize: "16px",
        display: "flex",
        paddingLeft: "0px",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        margin: 0,
    },
    page_item: {
        margin: 0,
        listStyle: "none",
    },
    page_link: {
        fontFamily: "Codec Pro Regular",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "#004266",
        textDecoration: "none",
        backgroundColor: "#ffffff",
        padding: "0.5rem 0.75rem",
        minWidth: "2.5rem",
        height: "2.5rem",
        borderRadius: "8px",
        border: "2px solid #e6e6e6",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#004266",
            color: "#004266",
            transform: "translateY(-2px)",
            boxShadow: "0px 2px 8px rgba(0, 66, 102, 0.2)",
        },
    },
    page_prev: {
        fontFamily: "Codec Pro Regular",
        fontWeight: "bold",
        border: "2px solid #004266",
        backgroundColor: "#004266",
        color: "#ffffff",
        padding: "0.5rem 0.75rem",
        minWidth: "2.5rem",
        height: "2.5rem",
        borderRadius: "8px",
        transition: "all 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#003050",
            borderColor: "#003050",
            color: "#ffffff",
            transform: "translateY(-2px)",
            boxShadow: "0px 2px 8px rgba(0, 66, 102, 0.3)",
        },
        "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            backgroundColor: "#e6e6e6",
            borderColor: "#e6e6e6",
            color: "#666",
            "&:hover": {
                backgroundColor: "#e6e6e6",
                borderColor: "#e6e6e6",
                color: "#666",
                transform: "none",
                boxShadow: "none",
            },
        },
    },
    page_next: {
        fontFamily: "Codec Pro Regular",
        fontWeight: "bold",
        border: "2px solid #004266",
        backgroundColor: "#004266",
        color: "#ffffff",
        padding: "0.5rem 0.75rem",
        minWidth: "2.5rem",
        height: "2.5rem",
        borderRadius: "8px",
        transition: "all 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#003050",
            borderColor: "#003050",
            color: "#ffffff",
            transform: "translateY(-2px)",
            boxShadow: "0px 2px 8px rgba(0, 66, 102, 0.3)",
        },
        "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            backgroundColor: "#e6e6e6",
            borderColor: "#e6e6e6",
            color: "#666",
            "&:hover": {
                backgroundColor: "#e6e6e6",
                borderColor: "#e6e6e6",
                color: "#666",
                transform: "none",
                boxShadow: "none",
            },
        },
    },
    activeLink: {
        backgroundColor: "#004266",
        color: "#ffffff",
        borderColor: "#004266",
        "&:hover": {
            backgroundColor: "#003050",
            borderColor: "#003050",
            color: "#ffffff",
        },
    },
}))

export default function NewsFeed(dadosNews) {
    const sectionTitle = "COMPET nas mídias"
    const classes = useStyles()

    return (
        <section id="compet-Journals">
            <SectionTitle title={sectionTitle} />
            <div className={cardStyles.mediaCard}>
                <div className={cardStyles.mediaCardContent}>
                    <div className={cardStyles.mediaCardScrollable}>
                        <PaginatedItems items={dadosNews.dados} classes={classes} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
function renderNews(dados) {
    return (
        <>
            {dados.map(dados => {
                const [dia, mes] = convertDate(dados.data).split("/")
                return (
                    <a target="_blank" href={dados.link} key={dados._id}>
                        <div className={styles.newsContainer}>
                            <div className={styles.dataNews}>
                                <time dateTime={convertDate(dados.data)}>
                                    <span className={styles.diaDataNews}>{dia}</span>
                                    <span className={styles.mesDataNews}>
                                        {meses[parseInt(mes) - 1]}
                                    </span>
                                </time>
                            </div>
                            <article className={styles.tituloNews}>{dados.titulo}</article>
                        </div>
                    </a>
                )
            })}
        </>
    )
}

function PaginatedItems({ items, classes }) {
    const itemsPerPage = 3
    const pageCount = Math.ceil(items.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(0)
    /** Evita mismatch de className JSS (SSR vs cliente) no react-paginate */
    const [paginateReady, setPaginateReady] = useState(false)
    useEffect(() => {
        setPaginateReady(true)
    }, [])

    const handlePageClick = (event) => {
        const newPage = event.selected
        setCurrentPage(newPage)
    }

    const itemOffset = currentPage * itemsPerPage
    const currentItems = items.slice(itemOffset, itemOffset + itemsPerPage)

    return (
        <>
            <div style={{ flex: 1 }}>
                {renderNews(currentItems)}
            </div>
            {pageCount > 1 && paginateReady && (
                <div className={cardStyles.mediaCardPagination}>
                    <ReactPaginate
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        previousLabel="<< "
                        forcePage={currentPage}
                        pageClassName={classes.page_item}
                        pageLinkClassName={classes.page_link}
                        previousClassName={classes.page_item}
                        previousLinkClassName={classes.page_prev}
                        nextClassName={classes.page_item}
                        nextLinkClassName={classes.page_next}
                        breakLabel="..."
                        breakClassName={classes.page_item}
                        breakLinkClassName={classes.page_link}
                        containerClassName={classes.pagination}
                        activeClassName={classes.page_item}
                        activeLinkClassName={classes.activeLink}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                    />
                </div>
            )}
        </>
    )
}

/** UTC: mesmo resultado no SSR (Vercel) e no browser, evitando erros de hidratação (#418 etc.) */
function convertDate(stringDate: string) {
    const date = new Date(stringDate)
    if (Number.isNaN(date.getTime())) {
        return "01/01/1970"
    }
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
}
