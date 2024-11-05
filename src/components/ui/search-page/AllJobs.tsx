import { JobWithId } from '../../../TS/store';
import JobCard from './jobcard/JobCard';
import styles from './alljobs.module.css';
interface JobsContainer {
  title: string;
  jobs: JobWithId[];
}
function AllJobs({ title, jobs }: JobsContainer) {
  return (
    <section className={styles.allJobs_Container}>
      <div className="mainWrapper">
        <h1 className={styles.mainTitle}>{title}</h1>
        <div className={styles.jobsContainer}>
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllJobs;
