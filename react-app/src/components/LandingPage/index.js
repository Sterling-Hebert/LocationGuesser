import React, { useState } from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';

function  LandingPage() {
    const { closeModal, openModal } = useModal();

  const handleLoginButtonClick = () => {
    openModal(<LoginFormModal />);
  };

  const handleSignupButtonClick = () => {
    openModal(<SignupFormModal />);
  };


  return (
    <div>
      <h1>Welcome to the Location Guesser</h1>
      <button onClick={handleLoginButtonClick}>Login</button>
      <button onClick={handleSignupButtonClick}>Signup</button>
    </div>
  );
}

export default LandingPage;
