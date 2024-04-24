import React, { useState, useEffect } from 'react';
import '../styles/LoginModals.css';
import '../styles/forms.css';


const LoginModal = ({ isOpen, onClose, onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setPassword('');
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginSuccessful = await onLogin(username, password);
    if (loginSuccessful) {
      setUsername(''); // Clear username
      setPassword(''); // Clear password
      onClose(); // Close the modal after logging in
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="user-auth-modal">
      <div className="user-auth-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className='error-message'>{error}</p>}
          <div className="button-group">
            <button className='btn btn-info' type="submit">Login</button>
            <button className='btn btn-dark' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;