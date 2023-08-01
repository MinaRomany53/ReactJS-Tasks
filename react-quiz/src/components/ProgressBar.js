export default function ProgressBar({
  noQuestions,
  maxPoints,
  currPoints,
  currentQuestion,
}) {
  return (
    <header className="progress">
      <progress max={noQuestions} value={currentQuestion + 1}></progress>
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {noQuestions}
      </p>
      <p>
        <strong>{currPoints}</strong> / {maxPoints} points
      </p>
    </header>
  );
}
