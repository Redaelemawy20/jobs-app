import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAutocompleteList,
  searchJobs,
  setSearchQuery,
} from '../../../../store/search';
import { useAppSelector, useAppDispatch } from '../../../../TS/hooks';
import styles from './search.module.css';
import { debounce } from '../../../../utils/debounce';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBox() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute = () => location.pathname === '/';
  const isSearchRoute = () => location.pathname.startsWith('/search');

  const getIntialQuery = () => {
    if (isHomeRoute()) return '';
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('query');
    return urlQuery ?? '';
  };

  const [query, setQuery] = useState(getIntialQuery);
  const [autocompleteStatus, setAutocompleteStatus] = useState<
    'hidden' | 'active'
  >('hidden');

  const autocompleteList = useAppSelector((state) =>
    getAutocompleteList(state, query)
  );

  const handleRouting = (query: string) => {
    if (isSearchRoute()) {
      dispatch(setSearchQuery(query));
    }
    if (query.length === 0 && isSearchRoute()) {
      navigate('/');
      dispatch(setSearchQuery(''));
      return;
    }
    if (query.length >= 3 && isHomeRoute()) {
      navigate(`/search?query=${query}`);
      dispatch(setSearchQuery(query));
    }
  };
  const dispatch = useAppDispatch();
  const debouncedLog = useCallback(
    debounce((query: string) => {
      handleRouting(query);
      if (query.length >= 3) dispatch(searchJobs(query));
    }, 500),
    []
  );
  const handleSearch = (q: string) => {
    setQuery(q);
    debouncedLog(q);
    setAutocompleteStatus('active');
  };

  const ref = useRef<any>(null);

  const handleSuggestItemClick = (suggestedItem: string) => {
    if (query.length < 3) dispatch(searchJobs(suggestedItem));
    dispatch(setSearchQuery(suggestedItem));
    setQuery(suggestedItem);
    setAutocompleteStatus('hidden');
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [location.pathname]);
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          placeholder="search keyword"
          onChange={(e) => handleSearch(e.target.value)}
          ref={ref}
        />
        <img
          className={styles.searchIcon}
          src="/svgs/Search.svg"
          alt="Search Icon"
        />
        {query && autocompleteStatus === 'active' && (
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
