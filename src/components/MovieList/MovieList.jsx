import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import clsx from "clsx";

const buildLinkClass = ({ vote }) => {
  return clsx(vote > 6.5 ? s.green : s.red);
};

const MovieList = ({ movies }) => {
  const lokation = useLocation();

  const formatDate = (date) => {
    if (!date) return "Unknown"; // Запобігаємо помилці
    const year = new Date(date).getFullYear();
    return isNaN(year) ? "Unknown" : year; // Запобігаємо `NaN`
  };

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => {
        if(!movie) return;

        return (
          <li key={movie.id} className={s.movieItem}>
            <Link to={`/movies/${movie.id}`} className={s.link} state={lokation}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title} />
              <div className={s.movieInfo}>
                <h2 className="movieTitle">{movie.title}</h2>
                <p className={s.movieScore}>
                  User Score:{" "}
                  <span className={buildLinkClass({ vote: movie.vote_average || 0 })}>
                    {movie.vote_average}
                  </span>
                </p>
                <p>{formatDate(movie.release_date)}</p>
              </div>
            </Link>
          </li>
        )
      } )}
    </ul>
  );
};
export default MovieList;
