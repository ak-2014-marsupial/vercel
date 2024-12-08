import React from 'react';

import css from "./Header.module.css"
import {MultiLevelDropdownMenu} from "../MultiLevelDropdownMenu";
import {UserInfoComponent} from "../UserInfo/UserInfo.component";

const Header = () => {
    return (

            <div className={css.header}>
                <MultiLevelDropdownMenu/>
                <UserInfoComponent/>
            </div>
    );
};

export {Header};