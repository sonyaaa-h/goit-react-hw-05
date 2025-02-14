import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../services/api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { ThreeDots } from "react-loader-spinner";

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const data = await fetchMovieCast(movieId);
                setCast(data.cast);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [movieId]);

    return (
        <div>
            <ul className={s.castList}>
                {cast
                    .filter(({ profile_path }) => profile_path)
                    .map(({ id, name, profile_path, character }) => (
                        <li className={s.castItem} key={id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                                alt={name}
                                className={s.castImg}
                            />
                            <p className={s.castName}>{name}</p>
                            <p>{character}</p>
                        </li>
                    ))}
            </ul>
            {isLoading && (
                <div className={s.loader}>
                    <ThreeDots
                        height="80"
                        width="80"
                        color="fff"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            )}
            {isError && (
                <p className={s.isError}>Something went wrong. Please, try again.</p>
            )}
        </div>
    );
};
export default MovieCast;
