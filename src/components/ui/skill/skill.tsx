import { useAppSelector } from '../../../TS/hooks';
import styles from './skill.module.css';

interface SkillItemI {
  skillId: string;
}

const Skill = ({ skillId }: SkillItemI) => {
  const skill = useAppSelector((state) => state.skills.byId[skillId]);
  if (!skill) return null;
  if (skill === 'loading') return <p className={`${styles.skeleton} `}></p>;
  return <p className={styles.skillItem}>{skill.name}</p>;
};

export default Skill;
