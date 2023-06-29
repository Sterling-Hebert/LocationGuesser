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
          <Link to="/world/play">World</Link>
        </button>
        <button className="GMP-button">
          <Link to="/famous-places/play">Famous Places</Link>
        </button>
        <button className="GMP-button">
          <Link to="/united-states/play">United States</Link>
        </button>
      </div>
    </>
  );
}

export default GameModePage;
