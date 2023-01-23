import { NavLink } from "react-router-dom";
import Style from "./GlobalNavStyle.module.css";

const GlobalNav = () => {
    const navLinks = [
        {
            id: 1,
            to: "/companies",
            value: "Companies",
        },
        {
            id: 2,
            to: "/addCompany",
            value: "Add company",
        },
        {
            id: 3,
            to: "/videogames",
            value: "Videogames",
        },
        {
            id: 4,
            to: "/addVideogame",
            value: "Add videogame",
        },
    ];
    return (
        <nav className={Style.container}>
            {navLinks.map((link) => {
                return (
                    <NavLink
                        key={link.id}
                        to={link.to}
                        end
                        className={({ isActive }) => (isActive ? Style.active : undefined)}
                    >
                        {link.value}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default GlobalNav;