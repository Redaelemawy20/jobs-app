import { useAppSelector } from '../../../../TS/hooks';
import LoadingHandler from '../../common/LoadingHandler';
import styles from './skill.module.css';

interface SkillItemI {
  skillId: string;
}

const Skill = ({ skillId }: SkillItemI) => {
  const skill = useAppSelector((state) => state.skills.byId[skillId]);

  return (
    <LoadingHandler
      status={skill}
      loadingUI={<p className={`${styles.skeleton} `}>...</p>}
      onError={'load error!'}
    >
      {(skill) => <p className={styles.skillItem}>{skill.name}</p>}
    </LoadingHandler>
  );
};

export default Skill;
