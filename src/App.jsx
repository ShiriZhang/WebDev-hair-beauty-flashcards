import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'
import GuessInput from './components/GuessInput'
import StreakCounter from './components/StreakCounter'

function App() {
  const allCards = [
    {
      id: 1,
      question: 'What does balayage mean in hair coloring?',
      answer: 'A hand-painted highlighting technique for a natural blended look.'
    },
    {
      id: 2,
      question: 'What is the main purpose of conditioner?',
      answer: 'It helps moisturize, soften, and smooth the hair.'
    },
    {
      id: 3,
      question: 'Which skincare step usually comes after cleansing?',
      answer: 'Toning or moisturizing, depending on the routine.'
    },
    {
      id: 4,
      question: 'What does SPF stand for?',
      answer: 'Sun Protection Factor.'
    },
    {
      id: 5,
      question: 'Why should you avoid washing hair too often?',
      answer: 'Overwashing can strip away natural oils and dry out the scalp.'
    },
    {
      id: 6,
      question: 'What is a common use of dry shampoo?',
      answer: 'It absorbs oil and refreshes hair between washes.'
    },
    {
      id: 7,
      question: 'Why is heat protectant important before styling?',
      answer: 'It helps reduce damage from hot tools like curling irons or straighteners.'
    },
    {
      id: 8,
      question: 'What is the purpose of exfoliating skin?',
      answer: 'It removes dead skin cells and helps keep skin smooth.'
    },
    {
      id: 9,
      question: 'What does a purple shampoo help with?',
      answer: 'It helps reduce brassiness in blonde or light-colored hair.'
    },
    {
      id: 10,
      question: 'Why is hydration important for healthy skin?',
      answer: 'It helps maintain the skin barrier and keeps skin looking fresh.'
    }
  ];

  // Card order and filtering
  const [cardOrder, setCardOrder] = useState(allCards.map((_, i) => i));
  const [masteredIds, setMasteredIds] = useState(new Set());


  // Current position in the ordered list
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Streak tracking
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Guess input key to force remount on card change
  const [guessKey, setGuessKey] = useState(0);

  // Get active (non-mastered) card indices in current order
  const activeCardIndices = cardOrder.filter(
    (idx) => !masteredIds.has(allCards[idx].id)
  );

  const activeCount = activeCardIndices.length;
  const currentCardIndex = activeCardIndices[currentPosition] ?? activeCardIndices[0];
  const currentCard = allCards[currentCardIndex];

  const isAtStart = currentPosition === 0;
  const isAtEnd = currentPosition >= activeCount - 1;

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setGuessKey((k) => k + 1);
  };

  const handleNext = () => {
    if (isAtEnd) return;
    setCurrentPosition((prev) => prev + 1);
    resetCardState();
  };

  const handlePrev = () => {
    if (isAtStart) return;
    setCurrentPosition((prev) => prev - 1);
    resetCardState();
  };

  const handleShuffle = () => {
    const shuffled = [...cardOrder];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardOrder(shuffled);
    setCurrentPosition(0);

    resetCardState();
  };

  const handleGuessResult = (isCorrect) => {
    if (isCorrect) {
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        setLongestStreak((longest) => Math.max(longest, newStreak));
        return newStreak;
      });
    } else {
      setCurrentStreak(0);
    }
  };

  const handleToggleMastered = () => {
    const cardId = currentCard.id;
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });

    // If we just mastered the card, adjust position
    if (!masteredIds.has(cardId)) {
      // Card is being mastered — check if we need to adjust position
      const newActiveCount = activeCount - 1;
      if (newActiveCount === 0) {
        // All cards mastered — position stays 0
        setCurrentPosition(0);
      } else if (currentPosition >= newActiveCount) {
        setCurrentPosition(newActiveCount - 1);
      }
      resetCardState();
    }
  };

  const isMastered = currentCard ? masteredIds.has(currentCard.id) : false;

  // All cards mastered state
  if (activeCount === 0) {
    return (
      <div className="app">
        <div className="header">
          <h1>Hair & Beauty Trivia Flashcards</h1>
          <p>You have mastered all {allCards.length} cards!</p>
        </div>
        <div className="mastered-list">
          <h3>Mastered Cards ({masteredIds.size})</h3>
          <ul>
            {allCards
              .filter((c) => masteredIds.has(c.id))
              .map((c) => (
                <li key={c.id}>{c.question}</li>
              ))}
          </ul>
          <button
            onClick={() => {
              setMasteredIds(new Set());
              setCurrentPosition(0);
              resetCardState();
            }}
          >
            Reset All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Hair & Beauty Trivia Flashcards</h1>
        <p>Test your knowledge of hair, skincare, makeup, and beauty facts with these fun flashcards!</p>
        <h3>
          Card {currentPosition + 1} of {activeCount}
          {masteredIds.size > 0 && (
            <span className="mastered-count"> ({masteredIds.size} mastered)</span>
          )}
        </h3>
      </div>

      <StreakCounter currentStreak={currentStreak} longestStreak={longestStreak} />

      <div className="card-section">
        <Flashcard
          question={currentCard.question}
          answer={currentCard.answer}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          isMastered={isMastered}
          onToggleMastered={handleToggleMastered}
        />
      </div>

      <div className="guess-section">
        <GuessInput
          key={guessKey}
          answer={currentCard.answer}
          onGuessResult={handleGuessResult}
          disabled={isFlipped}
        />
      </div>

      <div className="nav-section">
        <button
          className={`nav-btn ${isAtStart ? 'nav-disabled' : ''}`}
          onClick={handlePrev}
          disabled={isAtStart}
        >
          ← Back
        </button>
        <button className="shuffle-btn" onClick={handleShuffle}>
          🔀 Shuffle
        </button>
        <button
          className={`nav-btn ${isAtEnd ? 'nav-disabled' : ''}`}
          onClick={handleNext}
          disabled={isAtEnd}
        >
          Next →
        </button>
      </div>

      {masteredIds.size > 0 && (
        <div className="mastered-list">
          <h4>Mastered Cards ({masteredIds.size})</h4>
          <ul>
            {allCards
              .filter((c) => masteredIds.has(c.id))
              .map((c) => (
                <li key={c.id}>{c.question}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App
