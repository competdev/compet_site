import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import styles from '../../styles/IndexFeeds.module.css'
import cardStyles from '../../styles/MediaCard.module.css'

import SectionTitle from "../SectionTitle"

export default function NewsFeed(dadosNews) {
    const sectionTitle = "COMPET nas mídias"
    const items = Array.isArray(dadosNews?.dados) ? dadosNews.dados : []

    return (
        <section id="compet-Journals">
            <SectionTitle title={sectionTitle} />
            <div className={cardStyles.mediaCard}>
                <div className={cardStyles.mediaCardContent}>
                    <div className={cardStyles.mediaCardScrollable}>
                        <PaginatedItems items={items} />
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

function PaginatedItems({ items }) {
    const itemsPerPage = 3
    const pageCount = Math.ceil(items.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(0)
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
                        pageClassName={styles.pageItem}
                        pageLinkClassName={styles.pageLink}
                        previousClassName={styles.pageItem}
                        previousLinkClassName={styles.pagePrev}
                        nextClassName={styles.pageItem}
                        nextLinkClassName={styles.pageNext}
                        breakLabel="..."
                        breakClassName={styles.pageItem}
                        breakLinkClassName={styles.pageLink}
                        containerClassName={styles.pagination}
                        activeClassName={styles.pageItem}
                        activeLinkClassName={styles.activeLink}
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
