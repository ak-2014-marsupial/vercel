import React from 'react';

import css from "./Header.module.css"
import {NavbarComponent} from "../DropdownMenu/Navbar.component";
import {UserInfoComponent} from "../UserInfo/UserInfo.component";

const Header = () => {
    return (

            <div className={css.header}>
                <NavbarComponent/>
                <UserInfoComponent/>
            </div>
    );
};

export {Header};