import { useAppSelector } from '../../../TS/hooks';
import styles from '../styles/skillcard.module.css';
import LoadingHandler from '../common/LoadingHandler';
import { Skill } from '../../../TS/store';
import InfoCard from '../common/InfoCard';
interface SkillItemI {
  jobId: string;
  skillId: string;
}
/** job container */
function SkillJobCard({ jobId, skillId }: SkillItemI) {
  const skill = useAppSelector((state) => state.skills.byId[skillId]) as Skill;
  const job = useAppSelector((state) => state.jobs.byId[jobId]);

  let info = [
    { key: 'type', value: skill.type },
    { key: 'importance', value: skill.importance },
    { key: 'level', value: skill.level },
  ];
  return (
    <div className={styles.skillsCardContainer}>
      <LoadingHandler
        status={job}
        loadingUI={<InfoCard title="Loading job name..." info={info} />}
        onError={<InfoCard title="Error loading job name!" info={info} />}
      >
        {(job) => (
          <InfoCard title={job.title} info={info} href={`/job/${jobId}`} />
        )}
      </LoadingHandler>
    </div>
  );
}

export default SkillJobCard;
