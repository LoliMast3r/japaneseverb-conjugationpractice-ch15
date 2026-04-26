import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="main-title">て形活用変換チャレンジ</h1>
      
      <div className="button-group">
        <button className="menu-button" onClick={() => navigate('/ranking')}>
          ランキング
        </button>
        
        <button className="menu-button start-button" onClick={() => navigate('/start')}>
          スタート
        </button>
        
        <button className="menu-button" onClick={() => navigate('/vocab')}>
          単語一覧
        </button>
      </div>
    </div>
  );
};

export default Home;