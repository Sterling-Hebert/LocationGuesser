import React from 'react';
import { Link } from 'react-router-dom';
import './GameModePage.css';

function GameModePage() {
  return (
    <>
      <Link to="/main-menu" className="back-button">
        Back
      </Link>
      <h1 className="GMP-h1">Game Modes</h1>
      <div className="GMP-button-container">
        <button className="GMP-button">
          <Link to="/play/world">World</Link>
        </button>
        <button className="GMP-button">
          <Link to="/play/famous-places">Famous Places</Link>
        </button>
        <button className="GMP-button">
          <Link to="/play/united-states">United States</Link>
        </button>
      </div>
    </>
  );
}

export default GameModePage;
