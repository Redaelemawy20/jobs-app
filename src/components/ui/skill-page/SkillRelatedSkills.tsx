import { useAppDispatch, useAppSelector } from '../../../TS/hooks';
import { Skill } from '../../../TS/store';
import withOnScreen from '../../hoc/withOnScreen';
import Aside from '../common/aside/Aside';

import SkillLink from './SkillLink';
import { loadSkill } from '../../../store/skills';

const SkillLinkLoadOnVisible = withOnScreen(SkillLink);

const SkillRelatedSkills = ({ skillId }: { skillId: string }) => {
  const job = useAppSelector((state) => state.skills.byId[skillId]) as Skill;
  const dispatch = useAppDispatch();
  const relatedSkills = job.relationships.skills || [];
  return (
    <Aside title="Related Skills">
      {relatedSkills.map((skill) => (
        <SkillLinkLoadOnVisible
          skillId={skill.id}
          key={skill.id}
          onVisible={() => dispatch(loadSkill(skill.id))}
          threshold={0.6}
        />
      ))}
    </Aside>
  );
};

export default SkillRelatedSkills;
