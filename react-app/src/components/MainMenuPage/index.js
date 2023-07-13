import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './MainMenuPage.css';
import logo from './locationIcon.png';

function MainMenuPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="MMP-div">
      {/* <video class="video-background" autoplay loop muted>
    <source src="https://cdn.pixabay.com/vimeo/533374337/waterfall-69786.mp4?width=1280&hash=e7268647d9d17c0c5d5c701a8e467e956a1a5dc3" type="video/mp4"/>
    Your browser does not support the video tag.
  </video> */}
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <h1 className="MMP-h1">Location Guesser</h1>
      <div className="MMP-button-container">
        <button className="MMP-button-play">
          <Link to="/play/world">Play World Game</Link>
        </button>
        <button className="MMP-button-play">
          <Link to="/play/famous-places">Play Famous Places</Link>
        </button>
        <button className="MMP-button-play">
          <Link to="/play/united-states">Play United States</Link>
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
