import { useEffect } from "react";

export default function Timer({ timeLeft, dispatch }) {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "SET_TIME_LEFT" });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">{`${minutes < 10 && "0"}${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`}</div>
  );
}
