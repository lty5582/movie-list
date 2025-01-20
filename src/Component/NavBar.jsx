import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
     
        <a href="/" className="navbar-logo-link">MovieList</a>

      
        <div className="navbar-search">
          <input type="text" placeholder="검색해도 아무것도 안나와" />
          <button type="button">Search</button>
        </div>

      
        <div className="navbar-buttons">
          <button className="navbar-button login">로그인</button>
          <button className="navbar-button signup">회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;