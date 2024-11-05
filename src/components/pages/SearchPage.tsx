import Search from '../ui/search-page/search/SearchBox';

import AllJobs from '../ui/search-page/AllJobs';
import { useAppDispatch, useAppSelector } from '../../TS/hooks';
import { errorLoadingJobs, getJobs, loadJobs } from '../../store/jobs';
import LoadMore from '../ui/search-page/LoadMore';
import History from '../ui/search-page/History';
import LoadingHandler from '../ui/common/LoadingHandler';
import { useEffect } from 'react';
import { Job } from '../../TS/store';

function SearchPage() {
  const jobs = useAppSelector(getJobs);
  const query = useAppSelector((state) => state.search.query);
  const loading = useAppSelector((state) => state.jobs.loading);
  const error = useAppSelector(errorLoadingJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!query) dispatch(loadJobs());
  }, [dispatch]);
  const loadingStatus = () => {
    if (error) return 'error';
    if (loading) return 'loading';
    return jobs;
  };
  return (
    <>
      <Search />
      <div className="mainWrapper">
        <div className="common_grid">
          <LoadingHandler
            status={loadingStatus()}
            loadingUI={<AllJobs title="searching jobs" jobs={[]} />}
            onError={<AllJobs title="error laoding jobs" jobs={[]} />}
          >
            {(jobs) => <AllJobs jobs={jobs as any} title={query} />}
          </LoadingHandler>
          <History />
        </div>
      </div>
    </>
  );
}

export default SearchPage;
