import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../TS/hooks';
import Aside from '../common/aside/Aside';
import { useEffect } from 'react';
import { loadSearchHistory } from '../../../store/search';

const History = () => {
  const history = useAppSelector((state) => state.search.history);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSearchHistory());
  }, []);
  const getQueryURL = (query: string) => {
    const queryString = new URLSearchParams({ query }).toString();
    return `/search?${queryString}`;
  };
  return (
    <Aside title="Search History">
      {history.map((q) => (
        <Link key={q} to={getQueryURL(q)}>
          {q}
        </Link>
      ))}
    </Aside>
  );
};

export default History;
