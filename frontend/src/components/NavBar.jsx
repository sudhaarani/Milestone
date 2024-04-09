import React from 'react';

//FIX ROUTES FOR NAVBAR

const NavBar = ({ isLoggedIn, username }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/following">Following</a>
        <a href="/timelines">My Timeline</a>
        <a href="/favourites">Favourites</a>
        <a href="/create-new">Create New</a>
      </div>
      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">Hello, {username}</span>
            <a href="/logout">Logout</a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};



export default NavBar;
