import { Link } from 'react-router-dom';
import { useAppSelector } from '../../TS/hooks';

const RelatedJob = ({ jobId }: { jobId: string }) => {
  const job = useAppSelector((state) => state.jobs.byId[jobId]);
  if (!job || job === 'loading') return <span>loading related job...</span>;
  if (job === 'error') return <span>loading error</span>;
  return <Link to={'/job/'}>{job.title}</Link>;
};

export default RelatedJob;
