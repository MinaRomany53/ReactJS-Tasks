export default function Footer({ selectedAnswer, onNext }) {
  return (
    <footer>
      <div className="timer">5:03</div>
      {selectedAnswer !== null && (
        <button className="btn btn-ui" onClick={onNext}>
          Next
        </button>
      )}
    </footer>
  );
}
