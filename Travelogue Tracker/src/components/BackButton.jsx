import styles from "./BackButton.module.css";

import { useNavigate } from "react-router-dom";

export default function BackButton({ children, type }) {
  const navigate = useNavigate();
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {children}
    </button>
  );
}
