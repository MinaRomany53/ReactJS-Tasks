import styles from "./PageNotFound.module.css";

import Navbar from "../components/Navbar";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <Navbar />
      <div className={styles.box}>
        <span>⚠️</span>
        <h1>Sorry, Page Not Found 😢</h1>
      </div>
    </main>
  );
}
