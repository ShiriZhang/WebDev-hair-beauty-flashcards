function StreakCounter({ currentStreak, longestStreak }) {
  return (
    <div className="streak-counter">
      <span className="streak-item">
        🔥 Current Streak: <strong>{currentStreak}</strong>
      </span>
      <span className="streak-item">
        🏆 Longest Streak: <strong>{longestStreak}</strong>
      </span>
    </div>
  );
}

export default StreakCounter;
