import { useState } from 'react';

function GuessInput({ answer, onGuessResult, disabled }) {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null

  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  const checkAnswer = () => {
    if (!guess.trim()) return;

    const normalizedGuess = normalize(guess);
    const normalizedAnswer = normalize(answer);

    // Exact match after normalization
    if (normalizedGuess === normalizedAnswer) {
      setFeedback('correct');
      onGuessResult(true);
      return;
    }

    // Fuzzy: check if the guess is a substantial substring of the answer
    // or if the answer contains the guess (at least 4 chars to avoid trivial matches)
    const guessWords = normalizedGuess.split(/\s+/);
    const answerWords = normalizedAnswer.split(/\s+/);

    // Check if most key words from the guess appear in the answer
    const matchingWords = guessWords.filter((word) =>
      word.length >= 3 && answerWords.some((aw) => aw.includes(word) || word.includes(aw))
    );

    const significantGuessWords = guessWords.filter((w) => w.length >= 3);
    const matchRatio = significantGuessWords.length > 0
      ? matchingWords.length / significantGuessWords.length
      : 0;

    if (matchRatio >= 0.5 && matchingWords.length >= 1) {
      setFeedback('correct');
      onGuessResult(true);
    } else {
      setFeedback('incorrect');
      onGuessResult(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const reset = () => {
    setGuess('');
    setFeedback(null);
  };

  // Expose reset via parent — we reset when card changes
  // This is handled by key prop in parent

  return (
    <div className={`guess-input ${feedback ? `guess-${feedback}` : ''}`}>
      <div className="guess-input-row">
        <label htmlFor="guess-box">Guess the answer:</label>
        <input
          id="guess-box"
          type="text"
          placeholder="Type your answer..."
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            if (feedback) setFeedback(null);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button onClick={checkAnswer} disabled={disabled || !guess.trim()}>
          Submit
        </button>
      </div>
      {feedback === 'correct' && (
        <p className="feedback feedback-correct">Correct!</p>
      )}
      {feedback === 'incorrect' && (
        <p className="feedback feedback-incorrect">Incorrect, try again!</p>
      )}
    </div>
  );
}

export default GuessInput;
