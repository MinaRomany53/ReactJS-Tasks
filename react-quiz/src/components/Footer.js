export default function Footer({ selectedAnswer, dispatch }) {
  return (
    <footer>
      <div className="timer">5:03</div>
      {selectedAnswer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "SET_CURRENT_QUESTION" })}
        >
          Next
        </button>
      )}
    </footer>
  );
}
