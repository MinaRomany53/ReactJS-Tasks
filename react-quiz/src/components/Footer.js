import Timer from "./Timer";

import { useQuizContext } from "../contexts/QuizContext";

export default function Footer() {
  const { selectedAnswer, noQuestions, currentQuestion, dispatch } =
    useQuizContext();
  return (
    <footer>
      <Timer />
      {selectedAnswer !== null && currentQuestion + 1 === noQuestions ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "SET_IS_FINISHED" })}
        >
          Finish
        </button>
      ) : (
        selectedAnswer !== null && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "SET_CURRENT_QUESTION" })}
          >
            Next
          </button>
        )
      )}
    </footer>
  );
}
