import { useQuizContext } from "../contexts/QuizContext";

export default function ProgressBar() {
  const {
    noQuestions,
    maxPoints,
    currentQuestion,
    points: currPoints,
  } = useQuizContext();
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
