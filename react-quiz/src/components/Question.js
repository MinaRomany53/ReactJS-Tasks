import Options from "./Options";

export default function Question({ question, selectedAnswer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        selectedAnswer={selectedAnswer}
        dispatch={dispatch}
      />
    </div>
  );
}
