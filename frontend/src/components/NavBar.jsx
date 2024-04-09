// File: NavBar.js
import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Ensure path is correct
import RegistrationModal from './RegistrationModal'; // Ensure path is correct

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleRegister = (username) => {
    setIsLoggedIn(true);  // Simulate login after registration
    setUsername(username);
    setShowRegistrationModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        {isLoggedIn && <>
          <a href="/following">Following</a>
          <a href="/timelines">My Timeline</a>
          <a href="/favourites">Favourites</a>
          <a href="/create-new">Create New</a>
        </>}
      </div>
      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">Hello, {username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setShowLoginModal(true)}>Login</button>
            <button onClick={() => setShowRegistrationModal(true)}>Register</button>
          </>
        )}
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      <RegistrationModal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)} onRegister={handleRegister} />
    </nav>
  );
};

export default NavBar;
