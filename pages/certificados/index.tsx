import axios from "axios";
import { useState } from 'react'
import Link from 'next/link'
import removeAccents from 'remove-accents';
import { makeStyles } from '@mui/styles';
import styles from "./Certificados.module.css";
import { NEXT_URL } from "../../util/config";
import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import SearchBox from "../../components/SearchBox"
import ReactPaginate from "react-paginate"
import Footer from "../../components/Footer"

Certificados.getInitialProps = async () => {
    const response = await axios.get(NEXT_URL + "/api/certificados")
    return { dados: response.data }
}

function loadPhotos(CompetTalks: boolean, CompBio: boolean, Titulo: string) {
    if (Titulo == "Certificado e Declaração de Participação PET - COMPET") {
        return "https://i.ibb.co/nbdnSB7/9.png"
    }
    if (CompetTalks) {
        return "https://i.ibb.co/GVfDrhm/4.png"
    } else if (CompBio) {
        return "https://i.ibb.co/nffSXMG/3.png"
    } else {
        return "https://i.ibb.co/GVfDrhm/4.png"
    }
}

function convertDate(stringDate) {
    const date = new Date(stringDate)

    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    const formatted = `${day}/${month}/${year}`
    return formatted
}

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

export default function Certificados({ dados }) {
    const [query, setQuery] = useState("")
    const classes = useStyles()

    const header_img_url = "https://i.ibb.co/MNpsdrb/certificados.png"

    function COMPETParticipation(certificado) {
        return certificado.titulo == "Certificado e Declaração de Participação PET - COMPET"
    }

    function otherCertifieds(certificado) {
        return certificado.titulo != "Certificado e Declaração de Participação PET - COMPET"
    }

    function certificateSearch(certificado) {
        if (byTitle(certificado)) {
            return certificado
        } else {
            return byName(certificado)
        }
    }

    function byTitle(certificado) {
        return removeAccents(certificado.titulo.toLowerCase()).includes(query.toLowerCase())
    }

    function byName(certificado) {
        let nameList = certificado.listaNomes
        let find = nameList.filter(element => {
            if (
                removeAccents(element).toLowerCase().indexOf(removeAccents(query).toLowerCase()) !==
                -1
            ) {
                return true
            }
        })

        if (find.length > 0) {
            return certificado
        }
    }

    let certificadoCOMPET = dados.filter(COMPETParticipation)
    dados = dados.filter(otherCertifieds)
    let data = certificadoCOMPET.concat(dados)

    return (
        <div className={styles.pageContent}>
            <title>COMPET | Certificados</title>
            <Header />
            <PageHeader
                url={header_img_url}
                caption={false}
                sortType={undefined}
                handleSelect={undefined}
            />
            <div className={styles.searchContainer}>
                <SearchBox placeholder="Pesquisar participante ou evento" setQuery={setQuery} />
            </div>
            {PaginatedItems(data.filter(certificateSearch), classes)}
            <Footer />
        </div>
    )
}

const renderCertificados = dadosAtuais => {
    return (
        <div className={styles.certificadosArea}>
            <div className={styles.certificadosContainer}>
                {dadosAtuais.map(certificado => (
                    <div key={certificado._id} className={styles.certificadoCard}>
                        <div>
                            <img
                                src={loadPhotos(
                                    certificado.compet_talks,
                                    certificado.compbio,
                                    certificado.titulo
                                )}
                                alt=""
                                className={styles.certificadoImg}
                            />
                        </div>
                        <div className={styles.certificadoTitulo}>{certificado.titulo}</div>
                        <div className={styles.certificadoData}>
                            {convertDate(certificado.data)}
                        </div>
                        <div className={styles.certificadoLink}>
                            <Link href={certificado.link} target="_blank">
                                Acessar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function PaginatedItems(items, classes) {
    const itemsPerPage = 8
    const pageCount = Math.ceil(items.length / itemsPerPage)

    const [itemOffset, setItemOffset] = useState(0)

    const handlePageClick = event => {
        setItemOffset(event.selected)
    }

    return (
        <>
            {renderCertificados(
                items.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)
            )}
            <div className={styles.containerPaginate}>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName={classes.page_item}
                    pageLinkClassName={classes.page_link}
                    previousClassName={classes.page_prev}
                    previousLinkClassName={classes.page_prev_link}
                    nextClassName={classes.page_next}
                    nextLinkClassName={classes.page_next_link}
                    breakLabel="..."
                    breakClassName={classes.page_item}
                    breakLinkClassName={classes.page_link}
                    containerClassName={classes.pagination}
                    activeClassName={classes.active}
                    activeLinkClassName={classes.activeLink}
                />
            </div>
        </>
    )
}
