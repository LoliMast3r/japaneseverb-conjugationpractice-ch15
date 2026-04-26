import React, { useState, useEffect } from 'react';
import vocabData from '../data/vocab.json';
import MarathonResult from './MarathonResult';

const MarathonGame = ({ onExit }) => {
  const [shuffledList, setShuffledList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

// 1. Handle the initial shuffle only once
  useEffect(() => {
    setShuffledList([...vocabData].sort(() => Math.random() - 0.5));
  }, []);

  // 2. Handle the timer logic, watching the 'isFinished' state
  useEffect(() => {
    let timer = null;
    
    // Only run the interval if the game is actively playing
    if (!isFinished) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }

    // Cleanup: React will run this and clear the interval the moment isFinished becomes true
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isFinished]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (userInput === shuffledList[currentIndex].te_hiragana) {
      setUserInput('');
      setErrorCount(0);
      if (currentIndex + 1 < shuffledList.length) {
        setCurrentIndex(c => c + 1);
      } else {
        setIsFinished(true);
      }
    } else {
      setIsWrong(true);
      setErrorCount(c => c + 1);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  if (!shuffledList.length) return null;

  if (isFinished) {
    return <MarathonResult timeInSeconds={seconds} />;
  }

  const current = shuffledList[currentIndex];
  const progress = (currentIndex / shuffledList.length) * 100;

  return (
    <div className="centered-container">
      <div className="game-top-bar">
        <span>モード: 単語完走</span>
        <div className="bar-right">
          <span className="timer">{formatTime(seconds)}</span>
          <button className="quit-btn-pastel" onClick={onExit}>諦める</button>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="play-box">
        <p className="instruction">単語のて形をひらがなで書いてください！</p>
        <h2 className="display-kanji">{current.masu_kanji}</h2>
        
        {/* Reserved space for the tip to prevent UI jumping */}
        <div className="tip-container">
          {errorCount >= 2 ? (
            <p className="hiragana-tip">ヒント：{current.masu_hiragana}</p>
          ) : null}
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

export default MarathonGame;