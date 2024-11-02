import React from "react";
import { Link } from "react-router-dom";
import styles from "./aside.module.css";
function Aside() {
  const links = [
    {
      name: "link 1",
      path: "/",
    },
    {
      name: "link 2",
      path: "/",
    },
    {
      name: "link 3",
      path: "/",
    },
    {
      name: "link 4",
      path: "/",
    },
    {
      name: "link 5",
      path: "/",
    },
    {
      name: "link 6",
      path: "/",
    },
    {
      name: "link 7",
      path: "/",
    },
    {
      name: "link 8",
      path: "/",
    },
  ];
  return (
    <aside className={styles.aside_container}>
      <ul className={styles.unList}>
        <h2 className={styles.unList_Title}>Search History</h2>
        {links.map((link, index) => (
          <li>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
