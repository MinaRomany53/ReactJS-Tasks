import { useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        Map Goes Here 😁
        <div>lng: {lng}</div>
        <div>lat: {lat}</div>
      </div>
    </div>
  );
}
