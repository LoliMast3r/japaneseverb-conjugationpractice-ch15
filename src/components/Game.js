import React, { useState } from 'react';
import ModeSelection from './ModeSelection';
import MarathonGame from './MarathonGame';
import TimedGame from './TimedGame';
import './Game.css';

const Game = () => {
  const [gameStage, setGameStage] = useState('selection'); // 'selection' or 'playing'
  const [mode, setMode] = useState('marathon');

  const handleStart = () => {
    setGameStage('playing');
  };

  const handleExit = () => {
    setGameStage('selection');
  };

  return (
    <div className="game-screen-wrapper">
      {gameStage === 'selection' ? (
        <ModeSelection 
          mode={mode} 
          setMode={setMode} 
          onStart={handleStart} 
        />
      ) : (
        mode === 'marathon' ? (
          <MarathonGame onExit={handleExit} />
        ) : (
          <TimedGame onExit={handleExit} />
        )
      )}
    </div>
  );
};

export default Game;