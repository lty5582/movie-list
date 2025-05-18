import React from "react";
import "./MovieCard.css";

function MovieCard({ title, posterUrl, rating, onClick }) {
  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">⭐: {rating.toFixed(1)}</p>
    </div>
  );
}

export default MovieCard;
