import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenuPage.css';

function MainMenuPage() {
  return (
    <div className="MMP-div">
      <h1 className="MMP-h1">Main Menu</h1>
      <div className="MMP-button-container">
        <button className="MMP-button">
          <Link to="/game-modes">Play</Link>
        </button>
        <button className="MMP-button">
          <Link to="/social">Social</Link>
        </button>
        <button className="MMP-button">
          <Link to="/my-stats">Stats</Link>
        </button>
        <button className="MMP-button">
          <Link to="/leader-boards">Leaderboards</Link>
        </button>
      </div>
    </div>
  );
}

export default MainMenuPage;
