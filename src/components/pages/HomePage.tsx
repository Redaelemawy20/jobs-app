import { errorLoadingJobs, getJobs, hasNext, loadJobs } from '../../store/jobs';
import { useAppDispatch, useAppSelector } from '../../TS/hooks';
import AllJobs from '../ui/search-page/AllJobs';
import LoadMore from '../ui/search-page/LoadMore';
import Search from '../ui/search-page/search/SearchBox';

function HomePage() {
  const loadMore = useAppSelector(hasNext);
  const error = useAppSelector(errorLoadingJobs);
  const jobs = useAppSelector(getJobs);
  const dispatch = useAppDispatch();
  const onLoad = () => {
    dispatch(loadJobs());
  };
  return (
    <div>
      <Search />
      <AllJobs jobs={jobs as any} title={'All Jobs'} />
      {loadMore && <LoadMore onLoad={onLoad} error={error} />}
    </div>
  );
}

export default HomePage;
