import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";

const initialState = {
  isStarted: false,
  questions: [],
  isLoading: true,
  isError: false,
  currentQuestion: 0,
  selectedAnswer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return { ...state, isLoading: true, isError: false };
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, isLoading: false };
    case "SET_IS_ERROR":
      return { ...state, isError: true, isLoading: false };
    case "SET_IS_STARTED":
      return { ...state, isStarted: true };
    case "SET_CURRENT_QUESTION":
      if (state.currentQuestion === state.questions.length - 1) {
        return {
          ...state,
          isStarted: false,
          currentQuestion: 0,
          selectedAnswer: null,
        };
      } else {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          selectedAnswer: null,
        };
      }
    case "SET_SELECTED_ANSWER":
      const points =
        action.payload === state.questions[state.currentQuestion].correctOption
          ? state.points + state.questions[state.currentQuestion].points
          : state.points;

      return { ...state, selectedAnswer: action.payload, points: points };

    default:
      return new Error("No matching action type");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const noQuestions = state.questions.length;
  // console.log("points: ", state.points);

  useEffect(() => {
    async function fetchQuestions() {
      dispatch({ type: "SET_IS_LOADING" });
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        // console.log("data: ", data);

        dispatch({ type: "SET_QUESTIONS", payload: data });
      } catch (err) {
        dispatch({ type: "SET_IS_ERROR" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.isLoading ? (
          <Loader />
        ) : state.isError ? (
          <Error />
        ) : !state.isStarted ? (
          <StartScreen noQuestions={noQuestions} dispatch={dispatch} />
        ) : (
          <>
            <Question
              question={state.questions[state.currentQuestion]}
              selectedAnswer={state.selectedAnswer}
              dispatch={dispatch}
            />
            <Footer selectedAnswer={state.selectedAnswer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
