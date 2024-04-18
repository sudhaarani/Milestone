import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom'; // Add this line
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

const NavBar = ({ handleFavouritesPage, handleHomePage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate(); // Add this line

  
 useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    setIsLoggedIn(true);
    setUsername(user.username);
    setUserId(user.id); // Set the user's ID
  }
}, []);

  const handleLogin = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (response.ok) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserId(user.id); // Store the user's ID in the state
      setLoginError(null);
      localStorage.setItem('user', JSON.stringify(user)); // Store user's information in local storage
      navigate('/'); // Change this line
      return true; // Login was successful
    } else {
      setLoginError(user.message);
      return false; // Login was not successful
    }
  } catch (error) {
    console.error('Network error:', error);
    setLoginError('Network error');
    return false; // Login was not successful
  }
};
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername(null);
    navigate('/'); // Change this line
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
        <NavLink exact to="/" onClick={handleHomePage}>Home</NavLink> 
        {isLoggedIn && <>
          <NavLink to="/following">Following</NavLink>
          <NavLink to={`/timelines/${userId}`}>My Timelines</NavLink>
          <NavLink to="/favourites" onClick={handleFavouritesPage}>Favourites</NavLink>
          <NavLink to="/create-new">Create New Timeline</NavLink>
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
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} error={loginError}/>
      <RegistrationModal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)} onRegister={handleRegister} />
    </nav>
  );
};

export default NavBar;