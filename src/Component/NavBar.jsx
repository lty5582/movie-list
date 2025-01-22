import React, { useState } from "react";
import "./NavBar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 관리

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setErrorMessage("검색어를 입력해주세요."); // 에러 메시지 설정
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
          params: {
            query: searchTerm.trim(),
            language: "ko-KR",
          },
        }
      );

      if (response.data.results.length === 0) {
        setErrorMessage("찾으시는 영화가 없습니다.");
        setSearchResults([]);
      } else {
        setSearchResults(response.data.results);
        setErrorMessage(""); // 에러 메시지 초기화
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("네트워크 문제 또는 TMDB 서버 문제로 요청이 실패했습니다.");
      } else {
        setErrorMessage("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
      setSearchResults([]); // 검색 결과 초기화
    }
  };

  const entersarch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo-link">
          <FontAwesomeIcon icon={faClapperboard} /> MovieList
        </a>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="찾으시는 영화를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={entersarch}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <div className="navbar-buttons">
          <button className="navbar-button login-button">로그인</button>
          <button className="navbar-button signup-button">회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;