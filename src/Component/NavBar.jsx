import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
          Movie
          </Link>
        </div>

        <div className="navbar-search">
          <input type="text" placeholder="영화를 검색하세요..." />
          <button>검색</button>
        </div>

        <div className="navbar-buttons">
          <button className="navbar-button">로그인</button>
          <button className="navbar-button">회원가입</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;