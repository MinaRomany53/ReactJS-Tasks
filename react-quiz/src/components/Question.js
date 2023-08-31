import Options from "./Options";

import { useQuizContext } from "../contexts/QuizContext";

export default function Question() {
  const { questions, currentQuestion } = useQuizContext();
  return (
    <div>
      <h4>{questions[currentQuestion].question}</h4>
      <Options />
    </div>
  );
}
