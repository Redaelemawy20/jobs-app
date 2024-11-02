import styles from "./skillcard.module.css";
function SkillsCard() {
  return (
    <div className={styles.skillsCardContainer}>
      <h2 className={styles.mainTitle}>Operational and Control</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,</p>
      <div className={styles.statistics}>
        <p>
          <span>Type: </span>
          knowladge
        </p>
        <p>
          <span>Importance: </span>
          3.7
        </p>
        <p>
          <span>Level: </span>
          2.3
        </p>
      </div>
    </div>
  );
}

export default SkillsCard;
