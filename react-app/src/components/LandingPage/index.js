import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import logo from './locationIcon.png';

function LandingPage() {
  const { closeModal, openModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLoginButtonClick = () => {
    openModal(<LoginFormModal />);
  };

  const handleSignupButtonClick = () => {
    openModal(<SignupFormModal />);
  };



  const handleDemo = async (e) => {
    e.preventDefault();
    let demoEmail = 'demoUS@aa.io';
    let demoPass = 'password';
    const data = await dispatch(login(demoEmail, demoPass));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/main-menu');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/main-menu');
    }
  };

  return (
    <div className="LP-div">
      <div className="LP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <h1 className="LP-h1">Location Guesser</h1>
      <button className="LP-button" onClick={handleDemo}>
          Guest Login
        </button>
      <div className="LP-buttons">
        <button className="LP-button" onClick={handleLoginButtonClick}>
          Login
        </button>
        <button className="LP-button" onClick={handleSignupButtonClick}>
          Signup
        </button>
        <button className="LP-button" onClick={() => window.location.href = 'https://github.com/Sterling-Hebert/LocationGuesser'}>
          <i className="fab fa-github"></i> GitHub Link
        </button>
        <button className="LP-button" onClick={() => window.location.href = 'https://www.linkedin.com/in/sterling-hebert-615137238/'}>
          <i className="fab fa-linkedin"></i> LinkedIn
        </button>
      <h2 className="LP-h2">Developed By Sterling Hebert</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default LandingPage;
