import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountryList({ cities }) {
  const countries = [
    ...new Set(
      cities.map((city) => {
        return new Object({
          country: city.country,
          emoji: city.emoji,
        });
      })
    ),
  ];

  if (countries.length === 0) {
    return (
      <Message message="Hello, Add your first city by clicking on a city on the map" />
    );
  }

  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
}
