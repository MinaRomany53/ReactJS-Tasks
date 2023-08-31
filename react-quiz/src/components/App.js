import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import ResultScreen from "./ResultScreen";

import { useQuizContext } from "../contexts/QuizContext";

export default function App() {
  const { isStarted, isFinished } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {!isStarted && !isFinished && <StartScreen />}
        {isStarted && (
          <>
            <ProgressBar />
            <Question />
            <Footer />
          </>
        )}
        {isFinished && <ResultScreen />}
      </Main>
    </div>
  );
}
