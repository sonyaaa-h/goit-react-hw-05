import { useEffect, useState } from "react";
import s from "./SearchBar.module.css";
import { FcSearch } from "react-icons/fc";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit, query }) => {
    const [value, setValue] = useState(query || "");

    useEffect(() => {
        setValue(query || "");
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedValue = value.trim();
        if (!trimmedValue) return toast.error("Please enter a search query.");
        if (trimmedValue !== query) {
            onSubmit(trimmedValue);
        }

    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input
                type="text"
                placeholder="Search movies"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                autoComplete="off"
                name="query"
            />
            <button type="submit" className={s.button}>
                <FcSearch size={25} />
            </button>
        </form>
    );
};
export default SearchBar;
