import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import './MovieList.css';
const MovieList = ({
  movies,
  searchResults,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange, // 페이지 변경 함수
}) => {
  const navigate = useNavigate();

  if (loading) return <div>로딩 중입니다...</div>;
  if (error) return <div>{error}</div>;

  // 검색 중이면 검색 결과를, 아니면 기본 영화 목록을 표시
  const displayedMovies = searchResults.length > 0 ? searchResults : movies;

  // 검색 여부 확인
  const isSearching = searchResults.length > 0;

  // 총 페이지 수 계산
  const totalPageCount = isSearching
    ? Math.ceil(searchResults.length / 20) // 검색 결과의 총 페이지 수
    : totalPages; // 기본 영화 목록의 총 페이지 수

  // 페이지 버튼 범위 계산 (최대 10개 버튼)
  const maxPagesToShow = 10;
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPageCount);

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
            onClick={() => navigate(`/details/${movie.id}`)}
          />
        ))}
      </div>

      {/* 페이지 네비게이션 */}
      {totalPageCount > 1 && ( // 총 페이지가 1 이상일 때만 표시
        <div className="pagination">
          {/* 이전 버튼 */}
          {currentPage > 1 && (
            <button
              className="page-button"
              onClick={() => onPageChange(currentPage - 1)}
            >
              이전
            </button>
          )}

          {/* 페이지 버튼 */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
          ).map((page) => (
            <button
              key={page}
              className={`page-button ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {/* 다음 버튼 */}
          {currentPage < totalPageCount && (
            <button
              className="page-button"
              onClick={() => onPageChange(currentPage + 1)}
            >
              다음
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;