import { useQuizContext } from "../contexts/QuizContext";

export default function StartScreen() {
  const { noQuestions, dispatch } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{noQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "SET_IS_STARTED" })}
      >
        Let's start
      </button>
    </div>
  );
}
