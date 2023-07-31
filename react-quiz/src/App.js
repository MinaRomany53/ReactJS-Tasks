import { useState, useEffect, useRef, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const noQuestions = questions.length;

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        console.log("data: ", data);

        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : !isStarted ? (
          <StartScreen
            setIsStarted={() => setIsStarted(!isStarted)}
            noQuestions={noQuestions}
          />
        ) : (
          <div>Quiz has been Started</div>
        )}
      </Main>
    </div>
  );
}
