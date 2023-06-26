import React from 'react';
import { Link } from 'react-router-dom';

function MainMenuPage() {
  return (
    <div>
      <h1>Main Menu</h1>
      <div>
        <p>
          <Link to="/game-modes">Play</Link>
        </p>
        <p>
          <Link to="/social">Social</Link>
        </p>
        <p>
          <Link to="/my-stats">Stats</Link>
        </p>
        <p>
          <Link to="/leader-boards">Leaderboards</Link>
        </p>
      </div>
    </div>
  );
}

export default MainMenuPage;
