import axios from "axios";
import removeAccents from 'remove-accents';
import { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@mui/styles';
import styles from "./Blog.module.css";

import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import SearchBox from "../../components/SearchBox"
import Posts from "../../components/Posts"
import Footer from "../../components/Footer"

const BLOG_API_URL = "https://compet-blog.herokuapp.com/api/posts?populate=thumb"

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

export default function Blog({ posts }) {
    const classes = useStyles()
    const header_img_url = "https://i.ibb.co/tDjGdZP/blog.png"
    const [query, setQuery] = useState("")

    function postsSearch(posts) {
        return removeAccents(posts.attributes.title.toLowerCase()).includes(query.toLowerCase())
    }

    return (
        <div className={styles.page}>
            {/* <title>COMPET | Blog</title>
      <Header />
      <PageHeader url={header_img_url} caption={false} sortType={undefined} handleSelect={undefined} />
      <div className={styles.searchContainer}>
        <SearchBox placeholder="Pesquisar postagens" setQuery={setQuery} />
      </div>
      <div className={styles.blogContent}>
        {PaginatedItems((posts.filter(postsSearch)), classes)}
      </div>
      <div className={styles.socialMediaContainer}></div>
      <Footer /> */}
            Under construction
        </div>
    )
}

// export async function getStaticProps(){
//   let postsRes = await axios.get(BLOG_API_URL);
//   postsRes.data.data.sort((a, b) => {
//     return Number(new Date(b.attributes.createdAt)) - Number(new Date(a.attributes.createdAt));
//   });

//   return {
//     props: {
//       posts: postsRes.data.data,
//     },
//   };
// }

function PaginatedItems(items, classes) {
    const itemsPerPage = 3
    const pageCount = Math.ceil(items.length / itemsPerPage)
    const [itemOffset, setItemOffset] = useState(0)

    const handlePageClick = event => {
        setItemOffset(event.selected)
    }

    return (
        <>
            <Posts
                posts={items.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)}
            />
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
        </>
    )
}
