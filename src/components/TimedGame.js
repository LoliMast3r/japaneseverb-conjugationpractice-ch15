import React, { useState, useEffect } from 'react';
import vocabData from '../data/vocab.json';
import TimedResult from './TimedResult';

const TimedGame = ({ onExit }) => {
  const [shuffledList, setShuffledList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setShuffledList([...vocabData].sort(() => Math.random() - 0.5));
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const current = shuffledList[currentIndex];

    if (userInput === current.te_hiragana) {
      setScore(s => s + 1);
      setUserInput('');
      setErrorCount(0);
      
      // If we run out of shuffled words before time is up, reshuffle and continue
      if (currentIndex + 1 < shuffledList.length) {
        setCurrentIndex(c => c + 1);
      } else {
        setShuffledList([...vocabData].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
      }
    } else {
      setIsWrong(true);
      setErrorCount(c => c + 1);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  if (!shuffledList.length) return null;
  if (isFinished) return <TimedResult score={score} />;

  const current = shuffledList[currentIndex];
  // Calculate bar width (starts at 100%, goes to 0%)
  const timerWidth = (timeLeft / 60) * 100;

  return (
    <div className="centered-container">
      <div className="game-top-bar">
        <span>モード: 時間制限</span>
        <div className="bar-right">
          <span className="score-display">スコア: {score}</span>
          <button className="quit-btn-pastel" onClick={onExit}>諦める</button>
        </div>
      </div>

      <div className="progress-track">
        {/* The bar now visually depletes */}
        <div className="progress-fill timer-bar" style={{ width: `${timerWidth}%` }}></div>
      </div>

      <div className="play-box">
        <p className="instruction">単語のて形をひらがなで書いてください！</p>
        <h2 className="display-kanji">{current.masu_kanji}</h2>
        
        <div className="tip-container">
          {errorCount >= 2 && <p className="hiragana-tip">ヒント：{current.masu_hiragana}</p>}
        </div>

        <form onSubmit={handleSubmit} className="input-container">
          <input 
            autoFocus
            className={`game-input ${isWrong ? 'shake-error' : ''}`}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="答えを入力..."
          />
          <button type="submit" className="circle-submit">→</button>
        </form>
      </div>
    </div>
  );
};

export default TimedGame;