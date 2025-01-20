import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Component/Layout";
import MovieCard from "./Component/MovieCard";
import MovieDetail from "./Component/MovieDetail";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
            params: {
              language: "ko-KR",
            },
          }
        );
        const filteredMovies = response.data.results.filter(
          (movie) => movie.adult === false
        );
        setMovies(filteredMovies);
      } catch (err) {
        setError("영화 데이터를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const MovieList = () => {
    const navigate = useNavigate();
  
    if (loading) return <div>로딩 중입니다...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
            onClick={() => navigate(`/details/${movie.id}`)} // onClick 전달
          />
        ))}
      </div>
    );
  };
  

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;