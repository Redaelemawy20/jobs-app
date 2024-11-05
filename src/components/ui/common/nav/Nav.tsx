import { Link, NavLink } from "react-router-dom";
import styles from "./nav.module.css";
function Nav() {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Search",
      link: "/search",
    },
    {
      name: "History",
      link: "/history",
    },
  ];

  return (
    <nav>
      <div className={`mainWrapper ${styles.nav}`}>
        <Link className={styles.logo} to="/">
          JobsNow
        </Link>
        <div>
          <ul>
            {links.map((item, index) => (
              <li key={index}>
                <NavLink className={styles.link} to={item.link}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
