import RelatedSkills from '../ui/job-page/JobRelatedSkills';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../TS/hooks';
import { loadJob } from '../../store/jobs';
import RelatedJobs from '../ui/job-page/JobRelatedJobs';
import LoadingHandler from '../ui/common/LoadingHandler';

function JobPage() {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const job = useAppSelector((state) => state.jobs.byId[id]);
  useEffect(() => {
    dispatch(loadJob(id));
  }, []);

  return (
    <>
      <div className="mainWrapper">
        <LoadingHandler
          status={job}
          loadingUI={<h2>Job is loading...</h2>}
          onError={<h2>Error loading job!</h2>}
        >
          {(job) => (
            <>
              <h1 className="mainTitle">{job.title}</h1>
              <div className="common_grid">
                <RelatedSkills skills={job.skills} jobId={id as string} />
                <RelatedJobs jobId={id as string} />
              </div>
            </>
          )}
        </LoadingHandler>
      </div>
    </>
  );
}

export default JobPage;
