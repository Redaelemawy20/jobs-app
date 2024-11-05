import { loadSkill } from '../../../store/skills';
import { useAppDispatch } from '../../../TS/hooks';
import withOnScreen from '../../hoc/withOnScreen';
import SkillCard from './SkillsCard';
import styles from '../styles/start_section.module.css';
const SkillContainer = withOnScreen(SkillCard);

interface JobRelatedSkillsI {
  jobId: string;
  skills: { id: string }[];
}
function JobRelatedSkills({ jobId, skills }: JobRelatedSkillsI) {
  const dispatch = useAppDispatch();
  const handleVisibleSkill = (skillId: string) => dispatch(loadSkill(skillId));
  return (
    <section className={styles.start_section}>
      <h2>RelatedSkills:</h2>
      {skills.map((s, i) => (
        <SkillContainer
          key={s.id}
          onVisible={() => handleVisibleSkill(s.id)}
          skillId={s.id}
          jobId={jobId}
        />
      ))}
    </section>
  );
}

export default JobRelatedSkills;
