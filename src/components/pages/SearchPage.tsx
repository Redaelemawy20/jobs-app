import Search from '../ui/search/SearchBox';

import AllJobs from '../sections/AllJobs';
import Aside from '../ui/aside/Aside';
import { useAppDispatch, useAppSelector } from '../../TS/hooks';
import { errorLoadingJobs, getJobs, loadJobs } from '../../store/jobs';
import LoadMore from '../ui/LoadMore';

function SearchPage() {
  const jobs = useAppSelector(getJobs);
  const query = useAppSelector((state) => state.search.query);
  const error = useAppSelector(errorLoadingJobs);
  const dispatch = useAppDispatch();
  const onLoad = () => {
    dispatch(loadJobs());
  };

  return (
    <>
      <Search />
      <div className="mainWrapper">
        <div className="common_grid">
          <AllJobs jobs={jobs} title="Search Results" />
          <Aside />
        </div>
      </div>
      {query.length < 3 && jobs.length === 0 && (
        <LoadMore onLoad={onLoad} error={error} />
      )}
    </>
  );
}

export default SearchPage;
