import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
     
        <a href="/" className="navbar-logo-link">MovieList</a>

      
        <div className="navbar-search">
          <input type="text" placeholder="Search movies..." />
          <button type="button">Search</button>
        </div>

      
        <div className="navbar-buttons">
          <button className="navbar-button login">Login</button>
          <button className="navbar-button signup">Signup</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;