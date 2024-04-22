import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom'; // Add this line
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import NewTimelineForm from './NewTimelineForm';

// NavBar.jsx

const NavBar = ({ handleFavouritesPage, handleHomePage, isLoggedIn, setIsLoggedIn, getTimelinesOf1User, userId, setUserId, newTimelineToggle }) => {
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserId(user.id); // Use the setUserId prop
    }
  }, [setUserId]);

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
        setUserId(user.id); // Use the setUserId prop
        setLoginError(null);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        return true;
      } else {
        setLoginError(user.message);
        return false;
      }
    } catch (error) {
      console.error('Incorrect password or email:', error);
      setLoginError('Incorrect password or email');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null); // Clear userId when the user logs out
    navigate('/');
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
          <NavLink to={`/timelines/${userId}`} onClick={() => { getTimelinesOf1User(userId) }}>My Timelines</NavLink>
          <NavLink to="/favourites" onClick={handleFavouritesPage}>Favourites</NavLink>
          <NavLink onClick={() => { newTimelineToggle.handleToggle() }}>Create New Timeline</NavLink>
        </>}
      </div>

      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">Hello, {username}</span>
            <button className='btn btn-outline-info' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className='btn btn-outline-info' onClick={() => setShowLoginModal(true)}>Login</button>
            <button className='btn btn-outline-warning' onClick={() => setShowRegistrationModal(true)}>Register</button>
          </>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} error={loginError}/>

      <RegistrationModal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)} onRegister={handleRegister} />

    </nav>
  );
};

export default NavBar;