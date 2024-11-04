import { loadSkill } from '../../store/skills';
import { useAppDispatch } from '../../TS/hooks';
import withOnScreen from '../hoc/withOnScreen';
import SkillsCard from '../ui/skillscard/SkillsCard';
import styles from './relatedskills.module.css';
const SkillsCardWithOnScreen = withOnScreen(SkillsCard);

interface RelatedSkillsI {
  jobId: string;
  skills: { id: string }[];
}
function RelatedSkills({ jobId, skills }: RelatedSkillsI) {
  const dispatch = useAppDispatch();
  return (
    <section className={styles.relatedSkillsSection}>
      <h2>RelatedSkills:</h2>
      {skills.map((skill, i) => (
        <SkillsCardWithOnScreen
          threshold={0.5}
          onVisible={() => dispatch(loadSkill(skill.id))}
          key={skill.id}
          skillId={skill.id}
          jobId={jobId}
        />
      ))}
    </section>
  );
}

export default RelatedSkills;
