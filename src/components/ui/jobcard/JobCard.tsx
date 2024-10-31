import { Link } from "react-router-dom";
import styles from "./jobcard.module.css";
function JobCard() {
  const skills = [
    "HTML",
    "CSS",
    "BOOTSTRAB",
    "JAVA SCRIPT",
    "REACTJS",
    "NEXTJS",
  ];
  return (
    <div className={styles.cardjob_Container}>
      <h2 className={styles.jobTitle}>job Title</h2>
      <p className={styles.skillsTitle}>Related Skills:</p>
      <div className={styles.skillsItemsContainer}>
        {skills.map((skill, index) => (
          <p className={styles.skillItem} key={index}>
            {skill}
          </p>
        ))}
      </div>
      <Link className={styles.viewDetails} to="/">
        View Job details
      </Link>
    </div>
  );
}

export default JobCard;
