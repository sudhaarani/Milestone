import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Add this line
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

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
    setIsLoggedIn(true);
    setUsername(username);
    setShowRegistrationModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-links">
        <NavLink exact to="/">Home</NavLink> {/* Change this */}
        {isLoggedIn && <>
          <NavLink to="/following">Following</NavLink>
          <NavLink to="/timelines">My Timeline</NavLink>
          <NavLink to="/favourites">Favourites</NavLink>
          <NavLink to="/create-new">Create New</NavLink>
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
