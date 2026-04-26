import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vocabData from '../data/vocab.json';
import './VocabList.css';

const VocabList = () => {
  const [activeChapter, setActiveChapter] = useState("13");
  const navigate = useNavigate();
  const chapters = ["13", "14", "15"];

  const filteredVocab = vocabData.filter(item => item.chapter === activeChapter);

  return (
    <div className="vocab-container">
      <h1 className="vocab-header">単語一覧</h1>

      {/* New Header Row for Tabs and Home Button */}
      <div className="menu-row">
        <div className="tab-view">
          {chapters.map(chap => (
            <button 
              key={chap}
              className={`tab-button ${activeChapter === chap ? 'active' : ''}`}
              onClick={() => setActiveChapter(chap)}
            >
              {chap}課
            </button>
          ))}
        </div>

        <button className="back-home-button" onClick={() => navigate('/home')}>
          ホームに戻る
        </button>
      </div>

      <div className="vocab-grid">
        {filteredVocab.map((verb, index) => (
          <div key={index} className="vocab-tile">
            <div className="tile-row masu-row">
              {verb.masu_kanji} | {verb.masu_hiragana}
            </div>
            <div className="tile-row te-row">
              て形：{verb.te_kanji}
            </div>
            <div className="tile-row meaning-row">
              {verb.meaning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabList;