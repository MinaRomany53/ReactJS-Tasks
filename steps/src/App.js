import { useState } from "react";
import { Fragment } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isHide, setHide] = useState(false);

  const handleNext = () => {
    setStep((step) => Math.min(step + 1, 3));
  };

  const handlePrevious = () => {
    setStep((step) => Math.max(step - 1, 1));
  };

  const handleHide = () => {
    setHide((isHide) => !isHide);
  };

  const handleClick = (num) => {
    setStep((step) => (step = num));
  };

  return (
    <Fragment>
      <button className="close" onClick={handleHide}>
        {<span>{isHide ? "Click Me " : "x"}</span>}
      </button>

      <div className={`steps ${isHide ? "hidden" : ""}`}>
        <div className="numbers">
          {messages.map((message, index) => (
            <NumberBtn num={index + 1} step={step} handleClick={handleClick} />
          ))}
        </div>

        <p className="message">
          Step {step}: {messages[step - 1]}
        </p>

        <div className="buttons">
          <ControlBtn text="Previous" handleClick={handlePrevious} />
          <ControlBtn text="Next" handleClick={handleNext} />
        </div>
      </div>
    </Fragment>
  );
}

function NumberBtn({ num, step, handleClick }) {
  return (
    <div
      className={step >= num ? "active" : ""}
      onClick={() => handleClick(num)}
    >
      {num}
    </div>
  );
}

function ControlBtn({ text, handleClick }) {
  return (
    <button
      className={text}
      onClick={handleClick}
      style={{
        backgroundColor: "#7950f2",
        color: "white",
      }}
    >
      {text}
    </button>
  );
}
