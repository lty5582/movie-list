import React from "react";
import "./MovieCard.css";

function MovieCard({ title, posterUrl, rating }) {
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">평점: {rating.toFixed(1)}</p>
    </div>
  );
}

export default MovieCard;