import styles from "./search.module.css";
function Search() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="search keyword"
        />
        <img
          className={styles.searchIcon}
          src="/svgs/Search.svg"
          alt="Search Icon"
        />
      </div>
    </div>
  );
}

export default Search;
