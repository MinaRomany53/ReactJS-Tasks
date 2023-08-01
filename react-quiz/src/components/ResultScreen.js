export default function ResultScreen({ points, maxPoints, dispatch }) {
  const percentage = Math.round((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        <span>{percentage <= 50 ? "🤨" : "🫡"}</span>
        You scored {points} out of {maxPoints} ({percentage}%)
      </p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART_QUIZ" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
