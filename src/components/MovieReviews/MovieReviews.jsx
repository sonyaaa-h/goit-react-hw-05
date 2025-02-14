import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import s from "./MovieReviews.module.css";
import { FaUserCircle } from "react-icons/fa";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const data = await fetchMovieReviews(movieId);
                setReviews(data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [movieId]);

    console.log(reviews);

    return (
        <div>
            <ul className={s.reviewList}>
                {reviews.map(({ id, author, content }) => (
                    <li key={id} className={s.reviewItem}>
                        <div className={s.authorContainer}>
                            <FaUserCircle size={30}/>
                            <p className={s.author}>{author}</p>
                        </div>
                        <p>{content}</p>
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
            {reviews.length === 0 && !isLoading && !isError && <p className={s.notFound}>No reviews found.</p>}
        </div>
    );
};
export default MovieReviews;
