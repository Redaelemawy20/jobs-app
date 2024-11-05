import { loadJob } from '../../../store/jobs';
import { useAppDispatch } from '../../../TS/hooks';
import withOnScreen from '../../hoc/withOnScreen';
import styles from '../styles/start_section.module.css';
import SkillJobCard from './SkillJobCard';

const JobCard = withOnScreen(SkillJobCard);

interface SkillRelatedJobsI {
  skillId: string;
  jobs: { id: string }[];
}
function SkillRelatedJobs({ skillId, jobs }: SkillRelatedJobsI) {
  const dispatch = useAppDispatch();
  const handleVisibleJob = (jobId: string) => dispatch(loadJob(jobId));
  return (
    <section className={styles.start_section}>
      <h2>Description:</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
        officiis assumenda officia impedit harum suscipit consectetur, quia
        fugiat dicta veniam repudiandae adipisci dignissimos non placeat odio ut
        pariatur illo quidem.
      </p>
      <h2>Related Jobs:</h2>
      {jobs.map((job, i) => (
        <JobCard
          key={job.id}
          jobId={job.id}
          skillId={skillId}
          onVisible={() => handleVisibleJob(job.id)}
        />
      ))}
    </section>
  );
}

export default SkillRelatedJobs;
