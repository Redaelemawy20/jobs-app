import SkillsCard from "../ui/skillscard/SkillsCard";
import styles from "./relatedskills.module.css";
function RelatedSkills() {
  return (
    <section className={styles.relatedSkillsSection}>
      <h2>RelatedSkills:</h2>
      <SkillsCard />
      <SkillsCard />
      <SkillsCard />
      <SkillsCard />
    </section>
  );
}

export default RelatedSkills;
