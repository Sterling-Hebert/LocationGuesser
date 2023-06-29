import React, { useState } from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';
import "./LandingPage.css"

function  LandingPage() {
    const { closeModal, openModal } = useModal();

  const handleLoginButtonClick = () => {
    openModal(<LoginFormModal />);
  };

  const handleSignupButtonClick = () => {
    openModal(<SignupFormModal />);
  };


  return (
    <div className="LP-div">
  <h1 className="LP-h1">Welcome to the Location Guesser</h1>
  <div className="LP-buttons">
    <button className="LP-button" onClick={handleLoginButtonClick}>Login</button>
    <button className="LP-button" onClick={handleSignupButtonClick}>Signup</button>
  </div>
</div>
  );
}

export default LandingPage;
