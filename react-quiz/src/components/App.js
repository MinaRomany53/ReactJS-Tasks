import { useState, useEffect, useRef, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const noQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [points, setPoints] = useState(0);
  console.log("points: ", points);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        // console.log("data: ", data);

        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchQuestions();
  }, []);

  function handlingNext() {
    if (currentQuestion === noQuestions - 1) {
      setIsStarted(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  }

  function handlingAnswer(answerIndex) {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctOption) {
      setPoints(points + questions[currentQuestion].points);
    }
  }

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
          <>
            <Question
              question={questions[currentQuestion]}
              setSelectedAnswer={(i) => handlingAnswer(i)}
              selectedAnswer={selectedAnswer}
            />
            <Footer selectedAnswer={selectedAnswer} onNext={handlingNext} />
          </>
        )}
      </Main>
    </div>
  );
}
