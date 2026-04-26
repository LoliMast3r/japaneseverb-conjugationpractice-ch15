import React from 'react';
// 1. Ensure BrowserRouter is imported correctly
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Ranking from './components/Ranking';
import VocabList from './components/VocabList';
import './App.css';

function App() {
  return (
    /* 2. Use the exact basename matching your GitHub repository name */
    <BrowserRouter basename="/japaneseverb-conjugationpractice-ch15">
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/start" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/vocab" element={<VocabList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;