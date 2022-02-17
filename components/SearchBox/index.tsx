import React from 'react';
import styles from "./SearchBox.module.css";

const SearchBox = ({ placeholder, setQuery }) => {
  const searchIcon = "https://i.ibb.co/6Ncfhf0/Search-Icon.jpg"
  return (
    <>
    <div className={styles.searchIcon}><img src={searchIcon} alt="" /></div>
    <input className={styles.search}
      placeholder={placeholder}
      onChange={event => (setQuery(event.target.value))} />
      </>
  )
}

export default SearchBox;