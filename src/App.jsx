import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Component/Layout";
import MovieCard from "./Component/MovieCard";
import MovieDetail from "./Component/MovieDetail";
import movieListData from "./movieListData.json";
import "./App.css";

function App() {
  const [movies] = useState(movieListData.results);

  const MovieList = () => {
    const navigate = useNavigate();

    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/details/${movie.id}`)}
            style={{ cursor: "pointer" }}>
            <MovieCard
              title={movie.title}
              posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}/>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="/details/:id" element={<MovieDetail />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;