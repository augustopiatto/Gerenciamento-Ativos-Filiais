import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.homeRouter}>
        Home
      </Link>
    </div>
  );
}

export default Header;
