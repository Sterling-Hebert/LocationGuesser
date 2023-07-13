import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./LeaderBoardsPage.css"
import logo from "./locationIcon.png"
const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/stats/leaderboard')
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.players);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
      });
  }, []);

  return (
    <>
    <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
        <Link to="/main-menu" className="back-button">
            Back
          </Link>
      </div>
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Total Games Played</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className="leaderboard-row">
              <td className="leaderboard-rank">{player.rank}</td>
              <td className="leaderboard-player">{player.name}</td>
              <td className="leaderboard-games-played">{player.totalGamesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

export default Leaderboard;
