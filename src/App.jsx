import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import MovieList from "./Component/MovieList";
import MovieDetail from "./Component/MovieDetail";
import axios from "axios";
import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
function App() {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // [추가] 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // [추가] 전체 페이지 수 상태
//test to .git
  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: API_KEY,
            language: "ko-KR",
            page, // [수정] 페이지 번호 추가
          },
        }
      );
      const filteredMovies = response.data.results.filter(
        (movie) => movie.adult === false
      );
      setMovies(filteredMovies);
      setTotalPages(response.data.total_pages); // [추가] 전체 페이지 수 설정
    } catch (err) {
      setError("영화 데이터를 가져오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage); // [수정] 현재 페이지에 따라 데이터 요청
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // [추가] 페이지 변경
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Layout setSearchResults={setSearchResults} />}
        >
          {/* MovieList 컴포넌트에 props 전달 */}
          <Route
            index
            element={
              <MovieList
                movies={movies}
                searchResults={searchResults}
                loading={loading}
                error={error}
                currentPage={currentPage} // [추가] 현재 페이지 전달
                totalPages={totalPages} // [추가] 전체 페이지 수 전달
                onPageChange={handlePageChange} // [추가] 페이지 변경 함수 전달
              />
            }
          />
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;