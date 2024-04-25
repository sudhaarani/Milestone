// File: RegistrationModal.js
import React, { useState } from 'react';
import '../styles/LoginModals.css';
import '../styles/forms.css';

const RegistrationModal = ({ isOpen, onClose, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return; // Prevent the registration if passwords do not match
    }
    onRegister(username); // Proceed with registration if passwords match
    onClose(); // Close the modal after "registration"
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="user-auth-modal">
      <div className="user-auth-content">
        <h2>Register</h2>
        <form className='user-auth-form' onSubmit={handleRegistration}>
          <input className='user-auth-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input className='user-auth-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input className='user-auth-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <div className="button-group">
            <button className='btn btn-info' type="submit">Register</button>
            <button className='btn btn-dark' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
