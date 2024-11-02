import { errorLoadingJobs, hasNext, loadJobs } from '../../store/jobs';
import { useAppDispatch, useAppSelector } from '../../TS/hooks';
import AllJobs from '../sections/AllJobs';
import LoadMore from '../ui/LoadMore';
import Search from '../ui/search/Search';
function HomePage() {
  const loadMore = useAppSelector(hasNext);
  const error = useAppSelector(errorLoadingJobs);
  const dispatch = useAppDispatch();
  const onLoad = () => {
    dispatch(loadJobs());
  };
  return (
    <div>
      <Search />
      <AllJobs />
      {loadMore && <LoadMore onLoad={onLoad} error={error} />}
    </div>
  );
}

export default HomePage;
