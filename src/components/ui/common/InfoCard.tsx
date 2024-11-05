import { Link } from 'react-router-dom';
import styles from '../styles/skillcard.module.css';
interface InfoCardI {
  title: string;
  description?: string;
  info: { key: string; value: string }[];
  href?: string;
}
// <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,</p>
const InfoCard = ({ title, description, info, href }: InfoCardI) => {
  return (
    <>
      <h2 className={styles.mainTitle}>
        {href ? <Link to={href}>{title}</Link> : title}
      </h2>
      {description && <p>{description}</p>}
      <div className={styles.statistics}>
        {info.map((item, i) => (
          <p key={item.key + i}>
            <span>{item.key}: </span>
            {item.value}
          </p>
        ))}
      </div>
    </>
  );
};

export default InfoCard;
