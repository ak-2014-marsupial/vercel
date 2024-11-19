import React from 'react';

import css from "./Header.module.css"
import {NavBar} from "../NavBar/NavBar";

const Header = () => {
    return (
        <div className={css.header}>
           <NavBar/>
        </div>
    );
};

export  {Header};