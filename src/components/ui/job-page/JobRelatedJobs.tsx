import { useAppDispatch, useAppSelector } from '../../../TS/hooks';
import { Job } from '../../../TS/store';
import withOnScreen from '../../hoc/withOnScreen';
import Aside from '../common/aside/Aside';
import JobLink from './JobLink';
import { loadJob } from '../../../store/jobs';
const JobLinkLoadOnVisible = withOnScreen(JobLink);
const JobRelatedJobs = ({ jobId }: { jobId: string }) => {
  const job = useAppSelector((state) => state.jobs.byId[jobId]) as Job;
  const dispatch = useAppDispatch();
  const relatedJobs = job.relatedJobs || [];
  return (
    <Aside title="Related Jobs">
      {relatedJobs.map((id) => (
        <JobLinkLoadOnVisible
          jobId={id}
          key={id}
          onVisible={() => dispatch(loadJob(id))}
          threshold={0.6}
        />
      ))}
    </Aside>
  );
};

export default JobRelatedJobs;
