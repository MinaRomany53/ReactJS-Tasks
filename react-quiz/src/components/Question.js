import Options from "./Options";

export default function Question({
  question,
  selectedAnswer,
  setSelectedAnswer,
}) {
  return (
    <>
      <h4>{question.question}</h4>
      <Options
        question={question}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </>
  );
}
