import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchSearchMovies } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoadMore from "../../components/LoadMore/LoadMore";
import s from "./MoviesPage.module.css";
import { ThreeDots } from "react-loader-spinner";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!query) return;
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const { results, total_pages } = await fetchSearchMovies(query, page);
                setMovies((prevMovies) => [...prevMovies, ...results]);
                setTotalPages(total_pages);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [query, page]);

    const handleSearch = (newQuery) => {
        console.log(newQuery);

        if (newQuery.trim() === "") return;
        setQuery(newQuery);
        setPage(1);
        setMovies([]);
        setTotalPages(1);
    };

    return (
        <div>
            <SearchBar onSubmit={handleSearch} />
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
            {movies.length === 0 && !isError && !isLoading && (
                <p className={s.notFound}>No movies</p>
            )}
        </div>
    );
};
export default MoviesPage;
