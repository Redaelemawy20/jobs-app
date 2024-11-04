import RelatedSkills from '../sections/RelatedSkills';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../TS/hooks';
import { loadJob } from '../../store/jobs';
import RelatedJobs from '../sections/RelatedJobs';

function JobPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const job = useAppSelector((state) => state.jobs.byId[id ?? '']);
  useEffect(() => {
    if (!job) {
      dispatch(loadJob(id ?? ''));
    }
  }, []);
  if (!job || job === 'loading') return <h2>Job is loading...</h2>;
  if (job === 'error') return <h2>Error loading job!</h2>;
  return (
    <>
      <div className="mainWrapper">
        <h1 className="mainTitle">{job.title}</h1>
        <div className="common_grid">
          <RelatedSkills skills={job.skills} jobId={id as string} />
          <RelatedJobs jobId={id as string} />
        </div>
      </div>
    </>
  );
}

export default JobPage;
