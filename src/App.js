import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Ranking from './components/Ranking';
import VocabList from './components/VocabList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Automatically redirect from "/" to "/home" */}
          <Route path="/" element={<Navigate to="/home" />} />
          
          {/* Your main entry page */}
          <Route path="/home" element={<Home />} />
          
          {/* Placeholder routes for the other pages */}
          <Route path="/start" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/vocab" element={<VocabList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;