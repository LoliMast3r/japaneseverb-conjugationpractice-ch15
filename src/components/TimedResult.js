import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import your database instance
import { db } from '../firebase'; 
// Import Firestore functions
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TimedResult = ({ score }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      // 1. Add the document to the 'rankings' collection
      await addDoc(collection(db, "rankings"), {
        name: playerName,
        score: score, // The number of correct answers
        mode: "timed",
        createdAt: serverTimestamp() // Server-side timestamp for accurate sorting
      });

      console.log(`Successfully uploaded: ${playerName} - ${score} points`);
      
      // 2. Redirect back to home after successful upload
      navigate('/home'); 
    } catch (error) {
      console.error("Error uploading score: ", error);
      alert("Failed to upload score. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="centered-container result-screen">
      <h1 className="main-title text-glow">頑張りましたね！</h1>
      
      <div className="score-display-box">
        <h2 className="massive-time">{score}</h2>
        <p className="time-label">正解数</p>
      </div>

      <div className="upload-section">
        <p className="instruction">ランキングに登録する名前を入力してください</p>
        
        <form onSubmit={handleUpload} className="input-container">
          <input 
            autoFocus
            className="game-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="名前を入力..."
            maxLength={15}
          />
          <button type="submit" className="circle-submit">→</button>
        </form>
      </div>

      <button className="quit-btn-pastel skip-upload-btn" onClick={handleSkip}>
        アップロードしない
      </button>
    </div>
  );
};

export default TimedResult;