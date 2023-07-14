import React, {useEffect, useState} from 'react';
import "./PersonalStatsPage.css"
import { Link } from 'react-router-dom';
import logo from './locationIcon.png';



function  PersonalStatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/stats/my_stats'),
      fetch('/api/stats/famous_places'),
      fetch('/api/stats/world'),
      fetch('/api/stats/united_states')
    ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        const [myStats, famousPlacesStats, worldStats, unitedStatesStats] = data;
        setStats({ myStats, famousPlacesStats, worldStats, unitedStatesStats });
      })
      .catch(error => console.error('Error fetching user stats:', error));
  }, []);

  if (!stats) {
    return <div className="MMP-loading">Loading user stats........... Maybe you haven't played a game yet?</div>;
  }

  return (
    <div>
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
        <Link to="/main-menu" className="back-button">
            Back
          </Link>
      </div>
      <h1 className='h1'>My Stats</h1>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Total Games Played</th>
            <th>Average Score</th>
            <th>Highest Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.myStats.totalGamesPlayed}</td>
            {/* <td>{stats.myStats.highestScore || 'N/A'}</td>
            <td>{stats.myStats.avgScore}</td> */}
            <td>{'Coming Soon'}</td>
            <td>{"Coming Soon"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonalStatsPage;
