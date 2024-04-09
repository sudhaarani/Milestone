import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Ensure the path matches where your LoginModal is located

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    // Here you would usually validate against backend
    setIsLoggedIn(true);
    setUsername(username);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
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
            <button onClick={() => setShowModal(true)}>Login</button>
            <a href="/register">Register</a>
          </>
        )}
      </div>
      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} onLogin={handleLogin} />
    </nav>
  );
};

export default NavBar;
