import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModeSelection = ({ mode, setMode, onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="centered-container">
      <h1 className="main-title">モードを選択してください</h1>
      
      <div className="selection-card">
        <div className="mode-button-group">
          <button 
            className={`menu-button ${mode === 'marathon' ? 'active' : 'inactive'}`}
            onClick={() => setMode('marathon')}
          >
            単語完走
          </button>
          <button 
            className={`menu-button ${mode === 'timed' ? 'active' : 'inactive'}`}
            onClick={() => setMode('timed')}
          >
            時間制限
          </button>
        </div>

        <div className="description-area">
          <p>{mode === 'marathon' ? "単語を全部一回答えましょう！" : "60秒以内になるべく多く答えましょう！"}</p>
        </div>

        <div className="action-group">
          <div><button className="start-btn" onClick={onStart}>スタート</button></div>
          <div><button className="text-link" onClick={() => navigate('/home')}>戻る</button></div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;