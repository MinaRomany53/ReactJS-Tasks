export default function Footer({
  selectedAnswer,
  noQuestions,
  currentQuestion,
  dispatch,
}) {
  return (
    <footer>
      <div className="timer">5:03</div>
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
