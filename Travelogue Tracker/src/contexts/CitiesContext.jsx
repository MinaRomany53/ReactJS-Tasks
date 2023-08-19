import { useEffect, useState, createContext, useContext } from "react";
import citiesData from "../data/cities.js";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);

  // Simulate fetching data from an API 😁  -  Get All The Cities Data
  useEffect(() => {
    function fetchQuestions() {
      setCities(citiesData);
    }
    fetchQuestions();
  }, []);

  return (
    <CitiesContext.Provider value={cities}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider scope");
  }
  return context;
}

export { CitiesProvider, useCities };
