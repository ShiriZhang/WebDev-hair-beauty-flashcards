function Flashcard({ question, answer, isFlipped, onFlip, isMastered, onToggleMastered }) {
  return (
    <div className="flashcard-container">
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
      {onToggleMastered && (
        <button
          className={`mastered-btn ${isMastered ? 'mastered-active' : ''}`}
          onClick={onToggleMastered}
        >
          {isMastered ? '★ Mastered' : '☆ Mark as Mastered'}
        </button>
      )}
    </div>
  );
}

export default Flashcard;
