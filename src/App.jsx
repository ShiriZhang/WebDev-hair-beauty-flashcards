import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'

function App() {
  const cards = [
    {
      question: 'What does balayage mean in hair coloring?',
      answer: 'A hand-painted highlighting technique for a natural blended look.'
    },
    {
      question: 'What is the main purpose of conditioner?',
      answer: 'It helps moisturize, soften, and smooth the hair.'
    },
    {
      question: 'Which skincare step usually comes after cleansing?',
      answer: 'Toning or moisturizing, depending on the routine.'
    },
    {
      question: 'What does SPF stand for?',
      answer: 'Sun Protection Factor.'
    },
    {
      question: 'Why should you avoid washing hair too often?',
      answer: 'Overwashing can strip away natural oils and dry out the scalp.'
    },
    {
      question: 'What is a common use of dry shampoo?',
      answer: 'It absorbs oil and refreshes hair between washes.'
    },
    {
      question: 'Why is heat protectant important before styling?',
      answer: 'It helps reduce damage from hot tools like curling irons or straighteners.'
    },
    {
      question: 'What is the purpose of exfoliating skin?',
      answer: 'It removes dead skin cells and helps keep skin smooth.'
    },
    {
      question: 'What does a purple shampoo help with?',
      answer: 'It helps reduce brassiness in blonde or light-colored hair.'
    },
    {
      question: 'Why is hydration important for healthy skin?',
      answer: 'It helps maintain the skin barrier and keeps skin looking fresh.'
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    if (cards.length <= 1) {
      setIsFlipped(false);
      return;
    }

    let nextIndex = currentCardIndex;
    while (nextIndex === currentCardIndex) {
      nextIndex = Math.floor(Math.random() * cards.length);
    }

    setCurrentCardIndex(nextIndex);
    setIsFlipped(false);
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="app">
      <div className="header">
        <h1>Hair & Beauty Trivia Flashcards</h1>
        <p>Test your knowledge of hair, skincare, makeup, and beauty facts with these fun flashcards!</p>
        <h3>Total Cards: {cards.length}</h3>
      </div>

      <div className="card-section">
        <Flashcard
          question={currentCard.question}
          answer={currentCard.answer}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      <div className="button-section">
        <button onClick={handleNextCard}>Next Card</button>
      </div>
    </div>
  );
}

export default App
