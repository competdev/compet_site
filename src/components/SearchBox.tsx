import React from 'react';
import styles from "../styles/SearchBox.module.css";

const SearchBox = ({ placeholder, query, setQuery }) => {
  return (
    <input className={styles.search}
      placeholder={placeholder}
      onChange={event => (setQuery(event.target.value))} />
  )
}

export default SearchBox;