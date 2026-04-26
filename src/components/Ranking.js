import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ranking.css';

// Import your Firebase configuration
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

const Ranking = () => {
  const [activeMode, setActiveMode] = useState("marathon");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const modes = [
    { id: "marathon", label: "単語完走" },
    { id: "timed", label: "時間制限" }
  ];

  const [leaderboardData, setLeaderboardData] = useState({
    marathon: [],
    timed: []
  });

  // Fetch rankings from Firebase
  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "rankings"),
          where("mode", "==", activeMode),
          // Marathon: ASC (lower time is better), Timed: DESC (higher score is better)
          orderBy("score", activeMode === "marathon" ? "asc" : "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const fetchedScores = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            name: data.name,
            // Numerical formatting logic
            score: activeMode === "marathon" 
              ? `${Math.floor(data.score / 60)}:${(data.score % 60).toString().padStart(2, '0')}`
              : `${data.score} pts`
          };
        });

        setLeaderboardData(prev => ({
          ...prev,
          [activeMode]: fetchedScores
        }));
      } catch (error) {
        console.error("Error fetching rankings: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, [activeMode]);

  const rows = Array.from({ length: 10 });

  return (
    <div className="vocab-container">
      <h1 className="vocab-header">ランキング</h1>

      <div className="menu-row">
        <div className="tab-view">
          {modes.map(mode => (
            <button 
              key={mode.id}
              className={`tab-button ${activeMode === mode.id ? 'active' : ''}`}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <button className="back-home-button" onClick={() => navigate('/home')}>
            ホームに戻る
        </button>
      </div>

      <div className={`ranking-board ${isLoading ? 'loading-fade' : ''}`}>
        <div className="ranking-header-row">
          <div className="ranking-column">名前</div>
          <div className="ranking-column">
            {activeMode === "marathon" ? "クリアタイム" : "正解数"}
          </div>
        </div>

        {rows.map((_, index) => {
          const entry = leaderboardData[activeMode][index];
          return (
            <div key={index} className="ranking-row">
              <div className="ranking-cell">
                {entry ? entry.name : ""}
              </div>
              <div className="ranking-cell">
                {entry ? entry.score : ""}
              </div>
            </div>
          );
        })}
      </div>
      
      {isLoading && <p className="loading-text">読み込み中...</p>}
    </div>
  );
};

export default Ranking;