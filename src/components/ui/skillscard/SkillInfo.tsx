import { useEffect } from 'react';
import { Skill } from '../../../TS/store';
import styles from './skillcard.module.css';

const SkillInfo = ({
  skill,
  onMount,
}: {
  skill: Skill;
  onMount?: VoidFunction;
}) => {
  useEffect(() => {
    if (onMount) onMount();
  }, []);
  return (
    <>
      <h2 className={styles.mainTitle}>{skill.name}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,</p>
      <div className={styles.statistics}>
        <p>
          <span>Type: </span>
          {skill.type}
        </p>
        <p>
          <span>Importance: </span>
          {skill.importance}
        </p>
        <p>
          <span>Level: </span>
          {skill.level}
        </p>
      </div>
    </>
  );
};

export default SkillInfo;
