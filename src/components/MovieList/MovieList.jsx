import { Link } from "react-router-dom";
import s from "./MovieList.module.css";
import clsx from "clsx";

const buildLinkClass = ({ vote }) => {
  return clsx(vote > 6.5 ? s.green : s.red);
};

const MovieList = ({ movies }) => {
  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movieItem}>
          <Link to={`/movies/${movie.id}`} className={s.link}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.movieInfo}>
              <h2 className="movieTitle">{movie.title}</h2>
              <p className={s.movieScore}>
                User Score:{" "}
                <span className={buildLinkClass({ vote: movie.vote_average })}>
                  {movie.vote_average}
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
