import styles from "./CityList.module.css";

import CityItem from "./CityItem";
import Message from "./Message";

export default function CityList({ cities }) {
  if (cities.length === 0) {
    return (
      <Message message="Hello, Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
