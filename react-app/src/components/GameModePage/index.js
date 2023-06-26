import React from 'react';
import { Link } from 'react-router-dom';

function GameModePage() {
  return (
    <>
      <h1>Game Modes</h1>
      <div>
        <button>
          <Link to="/world/play">World</Link>
        </button>
        <button>
          <Link to="/famous-places/play">Famous Places</Link>
        </button>
        <button>
          <Link to="/united-states/play">United States</Link>
        </button>
      </div>
    </>
  );
}

export default GameModePage;
