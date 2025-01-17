import React from "react";
import { useParams } from "react-router-dom";
import movieDetailData from "../movieDetailData.json";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();

  // id를 숫자로 변환하여 데이터와 비교
  const movie = parseInt(id, 10) === movieDetailData.id ? movieDetailData : null;

  // 영화가 없을 경우 처리
  if (!movie) {
    return <div className="error-message">영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="movie-detail">
      {/* 배경 이미지 */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className="overlay">
          <h1 className="title">{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="info-container">
        <div className="info-left">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />
        </div>
        <div className="info-right">
          <h2>{movie.title}</h2>
          <p>
            <strong>평점:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p>
            <strong>장르:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;