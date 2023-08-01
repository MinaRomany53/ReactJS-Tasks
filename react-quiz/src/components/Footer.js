import Timer from "./Timer";

export default function Footer({
  selectedAnswer,
  noQuestions,
  currentQuestion,
  timeLeft,
  dispatch,
}) {
  return (
    <footer>
      <Timer timeLeft={timeLeft} dispatch={dispatch} />
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
