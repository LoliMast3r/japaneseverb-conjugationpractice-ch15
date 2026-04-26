import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Adjust path if necessary
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MarathonResult = ({ timeInSeconds }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  // Helper to format the final time
  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

const handleUpload = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      // 1. Reference the 'rankings' collection and add a new document
      await addDoc(collection(db, "rankings"), {
        name: playerName,
        score: timeInSeconds, // Store as raw seconds for easy numerical sorting
        mode: "marathon",
        createdAt: serverTimestamp() // Uses Firebase server time for the leaderboard
      });

      console.log(`Successfully uploaded: ${playerName} - ${timeInSeconds}s`);
      
      // 2. Redirect to home or ranking page after successful upload
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
      <h1 className="main-title text-glow">完走おめでとう！</h1>
      
      <div className="score-display-box">
        <h2 className="massive-time">{formatTime(timeInSeconds)}</h2>
        <p className="time-label">完走用時</p>
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

export default MarathonResult;