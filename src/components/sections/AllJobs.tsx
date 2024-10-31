import JobCard from "../ui/jobcard/JobCard";
import styles from "./alljobs.module.css";
function AllJobs() {
  return (
    <section className={styles.allJobs_Container}>
      <div className="mainWrapper">
        <h1 className={styles.mainTitle}>All Jobs (114)</h1>
        <div className={styles.jobsContainer}>
          <JobCard />
          <JobCard /> <JobCard /> <JobCard /> <JobCard /> <JobCard />
          <JobCard />
        </div>
      </div>
    </section>
  );
}

export default AllJobs;
