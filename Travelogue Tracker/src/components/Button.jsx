import styles from "./Button.module.css";

export default function Button({ children, type, action }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={action}>
      {children}
    </button>
  );
}
