import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './MainMenuPage.css';
import logo from './locationIcon.png';


function MainMenuPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');  };

  return (
    <div className="MMP-div">
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <h1 className="MMP-h1">Location Guesser</h1>
      <div className="MMP-card-container">
        <div className="MMP-card MMP-card-play">
          <Link to="/play/world" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg1"></div>
            <span>Play World Game</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-play">
          <Link to="/play/famous-places" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg2"></div>
            <span>Play Famous Places</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-play">
          <Link to="/play/united-states" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg3"></div>
            <span>Play United States</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-social">
          <Link to="/social" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg4"></div>
            <span>Social</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-stats">
          <Link to="/my-stats" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg5"></div>
            <span>Stats</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-leaderboards">
          <Link to="/leader-boards" className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg6"></div>
            <span>Leaderboards</span>
          </Link>
        </div>
        <div className="MMP-card MMP-card-logout" onClick={handleLogout}>
          <div className="MMP-card-link">
            <div className="MMP-card-bg MMP-bg7"></div>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenuPage;
