import { NavLink } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";
import s from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
    return (
        <header className={s.header}>
            <SiThemoviedatabase fill="#fff" size={30} />
            <div className={s.nav}>
                <NavLink to="/" className={buildLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/movies" className={buildLinkClass}>
                    Movies
                </NavLink>
            </div>
        </header>
    );
};
export default Navigation;
