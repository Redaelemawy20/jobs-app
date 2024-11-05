import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAutocompleteList,
  searchJobs,
  setSearchQuery,
  storeSearchQuery,
} from '../../../../store/search';
import { useAppSelector, useAppDispatch } from '../../../../TS/hooks';
import styles from './search.module.css';
import { debounce } from '../../../../utils/debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import toQueryString from '../../../../utils/toQueryString';

function SearchBox() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isTyping, setIsTyping] = useState(false);
  const urlQuery = new URLSearchParams(location.search).get('query') || '';
  const query = useAppSelector((state) => state.search.query);
  const autocompleteList = useAppSelector((state) =>
    getAutocompleteList(state, query)
  );
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current && !isTyping) {
      ref.current.value = urlQuery;
      dispatch(setSearchQuery(urlQuery));
    }
    dispatch(searchJobs());
  }, [urlQuery, dispatch]);

  const handleSearch = useCallback(
    (query: string) => {
      if (query.length >= 3) {
        navigate(`/search?${toQueryString(query)}`);
      }
      if (query.length === 0) navigate('/');
    },
    [navigate]
  );
  const debouncedSearch = debounce(handleSearch, 1000);
  const handleInputChange = () => {
    const inputValue = ref.current ? ref.current.value : '';
    setIsTyping(true);
    dispatch(setSearchQuery(inputValue));
    debouncedSearch(inputValue);
  };

  const handleSuggestItemClick = (suggestedItem: string) => {
    setIsTyping(false);
    dispatch(setSearchQuery(suggestedItem));
    dispatch(storeSearchQuery(suggestedItem));
    navigate(`/search?${toQueryString(suggestedItem)}`);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="search keyword"
          onChange={handleInputChange}
          ref={ref}
        />
        <img
          className={styles.searchIcon}
          src="/svgs/Search.svg"
          alt="Search Icon"
        />
        {isTyping && autocompleteList.length > 0 && (
          <ul className={styles.autocompleteList}>
            {autocompleteList.map((suggestedTitle, index) => (
              <li
                key={suggestedTitle}
                className={styles.autocompleteItem}
                onClick={() => {
                  handleSuggestItemClick(suggestedTitle);
                }}
              >
                {suggestedTitle}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
