import React from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

function MovieDetail({ movies = [] }) {
  const { id } = useParams();

  // URL에서 받은 id와 데이터 매칭
  const movie = movies.find((movie) => movie.id === parseInt(id));

  // 영화 데이터가 없을 경우
  if (!movie) {
    return <div>영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
            movie.backdrop_path || movie.poster_path
          })`,
        }}>
        <div className="overlay">
          <h1 className="backdrop-title">{movie.title}</h1>
        </div>
      </div>

      <div className="info">
        <div className="title-rating">
          <h2 className="title">{movie.title}</h2>
          <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
        </div>

        <div className="genre">
          <p>
            <strong>장르:</strong>{" "}
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "장르 정보 없음"}
          </p>
        </div>

        <div className="overview">
          <p>
            <strong>줄거리:</strong> {movie.overview || "정보가 없습니다."}
          </p>
        </div>

        <div className="actions">
          <button className="wishlist-btn">좋아요</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;