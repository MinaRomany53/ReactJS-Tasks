import { useEffect, useReducer, createContext, useContext } from "react";

import data from "../data/questions.js";

const QuizContext = createContext();

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

function QuizContextProvider({ children }) {
  const [
    {
      isStarted,
      questions,
      currentQuestion,
      selectedAnswer,
      points,
      isFinished,
      timeLeft,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const noQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  // Simulate fetching data from an API 😁
  useEffect(() => {
    function fetchQuestions() {
      dispatch({ type: "SET_QUESTIONS", payload: data });
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        isStarted,
        questions,
        currentQuestion,
        selectedAnswer,
        points,
        isFinished,
        timeLeft,
        dispatch,
        noQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }
  return context;
}

export { QuizContextProvider, useQuizContext };
