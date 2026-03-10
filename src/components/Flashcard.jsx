function Flashcard({ question, answer, isFlipped, onFlip }) {
  return (
    <div className="flashcard-scene" onClick={onFlip}>
      <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          <p>{question}</p>
        </div>
        <div className="flashcard-face flashcard-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
