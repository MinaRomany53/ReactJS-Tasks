import { useEffect, useReducer } from "react";

import data from "../data/questions";

import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import ResultScreen from "./ResultScreen";

const initialState = {
  isStarted: false,
  questions: [],
  currentQuestion: 0,
  selectedAnswer: null,
  points: 0,
  isFinished: false,
  timeLeft: 5 * 60,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };
    case "SET_IS_STARTED":
      return { ...state, isStarted: true };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedAnswer: null,
      };
    case "SET_SELECTED_ANSWER":
      const points =
        action.payload === state.questions[state.currentQuestion].correctOption
          ? state.points + state.questions[state.currentQuestion].points
          : state.points;

      return { ...state, selectedAnswer: action.payload, points: points };
    case "SET_IS_FINISHED":
      return {
        ...state,
        isFinished: true,
        isStarted: false,
        currentQuestion: 0,
        selectedAnswer: null,
      };
    case "RESTART_QUIZ":
      return { ...initialState, questions: state.questions };
    case "SET_TIME_LEFT":
      if (state.timeLeft === 0) {
        return {
          ...state,
          isFinished: true,
          isStarted: false,
          currentQuestion: 0,
          selectedAnswer: null,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    default:
      return new Error("No matching action type");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const noQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((acc, curr) => acc + curr.points, 0);

  // Simulate fetching data from an API 😁
  useEffect(() => {
    function fetchQuestions() {
      dispatch({ type: "SET_QUESTIONS", payload: data });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {!state.isStarted && !state.isFinished && (
          <StartScreen noQuestions={noQuestions} dispatch={dispatch} />
        )}
        {state.isStarted && (
          <>
            <ProgressBar
              noQuestions={noQuestions}
              maxPoints={maxPoints}
              currPoints={state.points}
              currentQuestion={state.currentQuestion}
            />
            <Question
              question={state.questions[state.currentQuestion]}
              selectedAnswer={state.selectedAnswer}
              dispatch={dispatch}
            />
            <Footer
              selectedAnswer={state.selectedAnswer}
              noQuestions={noQuestions}
              currentQuestion={state.currentQuestion}
              timeLeft={state.timeLeft}
              dispatch={dispatch}
            />
          </>
        )}
        {state.isFinished && (
          <ResultScreen
            points={state.points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
