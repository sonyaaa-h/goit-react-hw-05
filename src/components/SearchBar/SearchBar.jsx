import { useState } from "react";
import s from "./SearchBar.module.css";
import { FcSearch } from "react-icons/fc";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() === "") return toast.error("Please enter a search query.");
        onSubmit(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input
                type="text"
                placeholder="Search movies"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                autoComplete="off"
            />
            <button type="submit" className={s.button}>
                <FcSearch size={25} />
            </button>
        </form>
    );
};
export default SearchBar;
