<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> adf40e2 (🐛 Fix)
import "./NavBar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
=======
import useDebounce from "../hooks/useDebounce"; // useDebounce 가져오기
>>>>>>> adf40e2 (🐛 Fix)

const NavBar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 관리
<<<<<<< HEAD

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
=======
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms 딜레이 적용

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm); // 디바운스된 검색어로 검색 실행
    }
  }, [debouncedSearchTerm]); // debouncedSearchTerm이 변경될 때만 실행

  const handleSearch = async (term) => {
    if (!term.trim()) {
>>>>>>> adf40e2 (🐛 Fix)
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
<<<<<<< HEAD
            query: searchTerm.trim(),
            language: "ko-KR",
=======
            query: term.trim(),
            language: "ko-KR",
            page:1,
>>>>>>> adf40e2 (🐛 Fix)
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

<<<<<<< HEAD
  const entersarch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
=======
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm); // 즉시 검색 실행 (Enter 키)
>>>>>>> adf40e2 (🐛 Fix)
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
<<<<<<< HEAD
            onKeyPress={entersarch}
          />
          <button type="button" onClick={handleSearch}>
=======
            onKeyPress={handleKeyPress} // Enter 키 처리
          />
          <button type="button" onClick={() => handleSearch(searchTerm)}>
>>>>>>> adf40e2 (🐛 Fix)
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