import React, { useState, useEffect } from 'react';

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
    <div className="modal">
      <div className="modal-content">
        <h2 style={{ color: 'black' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;