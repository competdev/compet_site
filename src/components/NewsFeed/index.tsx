import { makeStyles } from '@material-ui/styles';
import { useState } from 'react'
import ReactPaginate from 'react-paginate';
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle'

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    transition: "color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out",
    "&:hover": {
      backgroundColor: "#d8d9da",
      border: "1px solid #d8d9da",
    },
  },
  page_prev: {
    border: "1px solid #d8d9da",
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    "&:hover": {
      fontWeight: "700",
    },
  },
  page_next: {
    border: "1px solid #d8d9da",
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    "&:hover": {
      fontWeight: "700",
    },
  },
  activeLink: {
    border: '1px solid #e7e7e7',
    backgroundColor: "#e7e7e7",
    "&:hover": {
      border: '1px solid #e7e7e7',
    backgroundColor: "#e7e7e7",
    }
  }
}));

export default function NewsFeed(dadosNews) {
  const sectionTitle = "COMPET nas mídias"
  const classes = useStyles()

  return (
    <div>
      <SectionTitle title={sectionTitle} />
      <div className={styles.socialMediaContainer}>
      {PaginatedItems(dadosNews.dados, classes)}
      </div>
    </div>
  )
}

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
function renderNews(dados){
  return (
    <>
      {dados.map(dados => {
        const [dia, mes] = convertDate(dados.data).split("/");
        return (
          <a target="_blank" href={dados.link} key={dados._id}>
            <div className={styles.newsContainer}>
              <div className={styles.dataNews}>
                <span className={styles.diaDataNews} > 
                  {dia}
                </span>
                <span className={styles.mesDataNews} > 
                  {meses[parseInt(mes)-1]}
                </span>
              </div>
              <div className={styles.tituloNews}>
                {dados.titulo}
              </div>
            </div>
          </a>
      )})}
    </>
   )
}

function PaginatedItems(items, classes) {
  const itemsPerPage = 3;
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    setItemOffset(event.selected);
  };

  return (
    <>
      {renderNews(items.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage))}
      <div className={styles.containerPaginate}>
        <ReactPaginate
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="<< "
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


function convertDate(stringDate) {
  const date = new Date(stringDate)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  const formatted = `${day}/${month}`
  return formatted
}
