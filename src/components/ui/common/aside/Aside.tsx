import styles from './aside.module.css';
interface AsideI {
  title: string;
  children: React.ReactElement[];
}

function Aside({ title, children }: AsideI) {
  return (
    <aside className={styles.aside_container}>
      <h2 className={styles.unList_Title}>{title}</h2>
      <ul className={styles.unList}>
        {children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
