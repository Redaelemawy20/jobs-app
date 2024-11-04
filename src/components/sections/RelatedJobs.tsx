import { useAppDispatch, useAppSelector } from '../../TS/hooks';
import { Job } from '../../TS/store';
import withOnScreen from '../hoc/withOnScreen';
import Aside from '../ui/aside/Aside';
import RelatedJob from './RelatedJob';
import { loadJob } from '../../store/jobs';
const RelatedJobWithOnScreen = withOnScreen(RelatedJob);
const RelatedJobs = ({ jobId }: { jobId: string }) => {
  const job = useAppSelector((state) => state.jobs.byId[jobId]) as Job;
  const dispatch = useAppDispatch();
  const relatedJobs = job.relatedJobs || [];
  return (
    <Aside title="Related Jobs">
      {relatedJobs.map((id) => (
        <RelatedJobWithOnScreen
          jobId={id}
          key={id}
          onVisible={() => dispatch(loadJob(id))}
          threshold={0.6}
        />
      ))}
    </Aside>
  );
};

export default RelatedJobs;
