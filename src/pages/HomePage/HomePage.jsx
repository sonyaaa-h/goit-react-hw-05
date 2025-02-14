import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api";
import LoadMore from "../../components/LoadMore/LoadMore";
import { ThreeDots } from "react-loader-spinner";
import s from "./HomePage.module.css";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const { results, total_pages } = await fetchTrendingMovies(page);
                setMovies((prevMovies) => [...prevMovies, ...results]);
                setTotalPages(total_pages);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [page]);
    

    return (
        <div>
            <MovieList movies={movies} />
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
            {page < totalPages && !isLoading && (
                <LoadMore onClick={() => setPage(page + 1)} />
            )}
        </div>
    );
};
export default HomePage;
