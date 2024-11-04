import { useAppDispatch, useAppSelector } from '../../../TS/hooks';
import styles from './skillcard.module.css';
import SkillInfo from './SkillInfo';
import { setRelatedJobs } from '../../../store/jobs';
interface SkillItemI {
  jobId: string;
  skillId: string;
}
/** skill container */
function SkillsCard({ jobId, skillId }: SkillItemI) {
  const skill = useAppSelector((state) => state.skills.byId[skillId]);
  const dispatch = useAppDispatch();

  if (!skill || skill === 'loading')
    return (
      <div className={styles.skillsCardContainer}>
        <h2>Loading Skill</h2>
      </div>
    );
  const loadSkillRelatedJobs = () => {
    dispatch(setRelatedJobs({ jobId, relatedJobs: skill.relationships.jobs }));
  };

  return (
    <div className={styles.skillsCardContainer}>
      <SkillInfo skill={skill} onMount={loadSkillRelatedJobs} />
    </div>
  );
}

export default SkillsCard;
