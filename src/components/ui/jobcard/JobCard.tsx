import { Link } from 'react-router-dom';
import styles from './jobcard.module.css';
import { useAppDispatch, useAppSelector } from '../../../TS/hooks';
import { useEffect } from 'react';
import { loadSkills } from '../../../store/skills';
import useOnScreen from '../../hooks/useOnScreen';
import Skill from '../skill/skill';
interface JobCardI {
  jobId: string;
}
function JobCard({ jobId }: JobCardI) {
  const job = useAppSelector((state) => state.jobs.byId[jobId]);
  const dispatch = useAppDispatch();
  const jobSkills = job.skills;
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      dispatch(loadSkills(jobSkills));
    }
  }, [isVisible]);
  return (
    <div ref={ref} className={styles.cardjob_Container}>
      <h2 className={styles.jobTitle}>{job.title}</h2>
      <p className={styles.skillsTitle}>Related Skills:</p>
      <div className={styles.skillsItemsContainer}>
        {jobSkills.map((skill) => (
          <Skill skillId={skill.id} key={skill.id} />
        ))}
      </div>
      <Link className={styles.viewDetails} to="/">
        View Job details
      </Link>
    </div>
  );
}

export default JobCard;
