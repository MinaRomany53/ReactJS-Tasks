import styles from "./Logo.module.css";

import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/logo.png" alt="Travelogue logo" />
      <span className={styles.logoText}> Travelogue</span>
    </Link>
  );
}

export default Logo;
