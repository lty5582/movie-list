import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
            params: {
              language: "ko-KR",
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError("영화를 찾을 수 없습니다.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="movie-detail">
      <div className="backdrop"style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,}}>
        <div className="overlay">
          <h1 className="title">{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
        </div>
      </div>
      <div className="info-container">
        <div className="info-left">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title}className="poster"/>
        </div>
        <div className="info-right">
          <h2>{movie.title}</h2>
          <p>
            <strong>평점:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p>
            <strong>장르:</strong>{" "} {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>줄거리:</strong> {movie.overview}
          </p>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>상영 시간:</strong> {movie.runtime}분
          </p>
          <p>
            <strong>제작사:</strong>{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
          <p>
            <strong>청소년 관람 가능:</strong>{movie.adult ? "X" : "O"}
          </p>
        </div>
      </div>
    </div>
  );
};

const MovieDetailSkeleton = () => (
  <div className="movie-detail">
    <div className="backdrop skeleton-backdrop"></div>
    <div className="info-container">
      <div className="info-left skeleton-poster"></div>
      <div className="info-right">
        <h2 className="skeleton-text skeleton-title"></h2>
        <p className="skeleton-text skeleton-line"></p>
        <p className="skeleton-text skeleton-line"></p>
        <p className="skeleton-text skeleton-line"></p>
      </div>
    </div>
  </div>
);

export default MovieDetail;