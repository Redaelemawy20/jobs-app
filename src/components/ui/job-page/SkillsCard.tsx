import { useAppDispatch, useAppSelector } from '../../../TS/hooks';
import styles from '../styles/skillcard.module.css';
import { setRelatedJobs } from '../../../store/jobs';
import LoadingHandler from '../common/LoadingHandler';
import { Skill } from '../../../TS/store';
import InfoCard from '../common/InfoCard';
interface SkillItemI {
  jobId: string;
  skillId: string;
}
/** skill container */
function SkillsCard({ jobId, skillId }: SkillItemI) {
  const skill = useAppSelector((state) => state.skills.byId[skillId]);
  const dispatch = useAppDispatch();
  const loadSkillRelatedJobs = (skill: Skill) => {
    dispatch(
      setRelatedJobs({
        jobId,
        relatedJobs: skill.relationships.jobs,
      })
    );
  };

  return (
    <div className={styles.skillsCardContainer}>
      <LoadingHandler
        status={skill}
        loadingUI="Loading skill.."
        onError={'Error loading skills!'}
        onLoad={loadSkillRelatedJobs}
      >
        {(skill) => (
          <InfoCard
            title={skill.name}
            info={[
              { key: 'type', value: skill.type },
              { key: 'importance', value: skill.importance },
              { key: 'level', value: skill.level },
            ]}
            href={`/skill/${skill.id}`}
          />
        )}
      </LoadingHandler>
    </div>
  );
}

export default SkillsCard;
