import { useQuizContext } from "../contexts/QuizContext";

export default function Options() {
  const { questions, currentQuestion, selectedAnswer, dispatch } =
    useQuizContext();
  const question = questions[currentQuestion];
  return (
    <div className="options">
      {selectedAnswer === null &&
        question.options.map((option, i) => {
          return (
            <button
              className="btn btn-option"
              key={i}
              onClick={() =>
                dispatch({ type: "SET_SELECTED_ANSWER", payload: i })
              }
            >
              {option}
            </button>
          );
        })}
      {selectedAnswer !== null &&
        question.options.map((option, i) => {
          return (
            <button
              className={`btn btn-option ${
                i === question.correctOption ? "correct" : "wrong"
              } ${selectedAnswer === i ? "answer" : ""}`}
              key={i}
              disabled
            >
              {option}
            </button>
          );
        })}
    </div>
  );
}
