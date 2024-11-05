import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../TS/hooks';
import { loadSkill } from '../../store/skills';
import LoadingHandler from '../ui/common/LoadingHandler';
import SkillRelatedJobs from '../ui/skill-page/SkillRelatedJobs';
import SkillRelatedSkills from '../ui/skill-page/SkillRelatedSkills';

function SkillPage() {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const skill = useAppSelector((state) => state.skills.byId[id]);

  useEffect(() => {
    dispatch(loadSkill(id));
  }, []);

  return (
    <>
      <div className="mainWrapper">
        <LoadingHandler
          status={skill}
          loadingUI={<h2>Skill is loading...</h2>}
          onError={<h2>Error loading skill!</h2>}
        >
          {(skill) => (
            <>
              <h1 className="mainTitle">{skill.name}</h1>
              <div className="common_grid">
                <SkillRelatedJobs
                  jobs={skill.relationships.jobs}
                  skillId={skill.id}
                />
                <SkillRelatedSkills skillId={skill.id} />
              </div>
            </>
          )}
        </LoadingHandler>
      </div>
    </>
  );
}

export default SkillPage;
