import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../TS/hooks';
import LoadingHandler from '../common/LoadingHandler';

const SkillLink = ({ skillId }: { skillId: string }) => {
  const skill = useAppSelector((state) => state.skills.byId[skillId]);
  return (
    <LoadingHandler
      status={skill}
      loadingUI={<span>loading related skill...</span>}
      onError={<span>loading error</span>}
    >
      {(skill) => <Link to={`/skill/${skillId}`}>{skill.name}</Link>}
    </LoadingHandler>
  );
};

export default SkillLink;
