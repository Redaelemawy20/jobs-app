import JobCard from '../ui/jobcard/JobCard';
import styles from './alljobs.module.css';
import { useAppSelector } from '../../TS/hooks';
function AllJobs() {
  const jobs = useAppSelector((state) => state.jobs);
  // const renderTitle = () => {
  //   if (jobs.error) return 'Error Loading Jobs';
  //   if (jobs.loading) return 'Loading Jobs...';
  //   return 'All Jobs (114)';
  // };
  return (
    <section className={styles.allJobs_Container}>
      <div className="mainWrapper">
        <h1 className={styles.mainTitle}>All Jobs</h1>

        <div className={styles.jobsContainer}>
          {jobs.allIds.map((id) => (
            <JobCard jobId={id} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllJobs;
