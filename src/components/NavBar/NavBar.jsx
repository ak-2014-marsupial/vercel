import React from 'react';
import {navBarLinks} from "../../router";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    const LiElement = ({goTo, title}) => {
        return (
                <li className={css.NavItem}><NavLink to={goTo}>{title}</NavLink></li>
        )
    }

    return (
            <nav className={css.NavBar}>
                <ul className={css.NavList}>
                    {navBarLinks.map(item => <LiElement key={item.goTo} {...item}/>)}
                </ul>
            </nav>
    );
};

export {NavBar};