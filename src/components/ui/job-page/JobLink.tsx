import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../TS/hooks';
import LoadingHandler from '../common/LoadingHandler';

const JobLink = ({ jobId }: { jobId: string }) => {
  const job = useAppSelector((state) => state.jobs.byId[jobId]);
  return (
    <LoadingHandler
      status={job}
      loadingUI={<span>loading related job...</span>}
      onError={<span>loading error</span>}
    >
      {(job) => <Link to={`/job/${jobId}`}>{job.title}</Link>}
    </LoadingHandler>
  );
};

export default JobLink;
