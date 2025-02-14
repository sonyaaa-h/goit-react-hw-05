import { useEffect, useRef, useState } from "react";
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { ThreeDots } from "react-loader-spinner";
import { IoArrowBackOutline } from "react-icons/io5";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const lokation = useLocation();
    const goBack = useRef(lokation?.state ?? "/movies");

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const data = await fetchMovieById(movieId);
                setMovie(data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [movieId]);

    if (!movie) {
        return (
            <div className={s.loader}>
                <ThreeDots
                    height="80"
                    width="80"
                    color="fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                />
            </div>
        );
    }

    const formatDate = (date) => new Date(date).getFullYear();

    return (
        <>
            <div className={s.linkWrapper}>
                <IoArrowBackOutline stroke="#fff" size={24} />
                <Link to={goBack.current} className={s.linkBack}>
                    Go back
                </Link>
            </div>
            <div
                className={s.backdrop}
            // style={{
            //     backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            // }}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={s.backdropImg}
                />
                <div className={s.backdropOverlay}></div>
            </div>
            <div className={s.container}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={s.image}
                />
                <div className={s.info}>
                    <h2 className={s.titleMovie}>{movie.title}</h2>

                    <div className={s.additionalInfo}>
                        <p className={s.userScore}>
                            User Score: <span className={s.score}>{movie.vote_average}</span>
                        </p>
                        <p className={s.releaseDate}>{formatDate(movie.release_date)}</p>
                        <p className={s.genres}>
                            {movie.genres.map((genre) => genre.name).join(", ")}
                        </p>
                    </div>

                    <div className={s.description}>
                        <h3 className={s.overview}>Overview:</h3>
                        <p className={s.overview}>{movie.overview}</p>
                    </div>
                </div>
            </div>
            <nav className={s.nav}>
                <NavLink to="cast" className={buildLinkClass}>
                    Cast
                </NavLink>
                <NavLink to="reviews" className={buildLinkClass}>
                    Reviews
                </NavLink>
            </nav>
            <div>
                <Outlet />
            </div>
            {isError && (
                <p className={s.isError}>Something went wrong. Please, try again.</p>
            )}
            {isLoading && <p className={s.loader}>Loading...</p>}
        </>
    );
};
export default MovieDetailsPage;
