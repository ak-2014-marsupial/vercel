import React from 'react';

import css from "./Header.module.css"
import {MultiLevelDropdownMenu} from "../MultiLevelDropdownMenu";
import {UserInfoComponent} from "../UserInfo/UserInfo.component";
import {useSelector} from "react-redux";
import useItemsConfig from "../../config/menuItems.config.js";
import useIconsConfig from "../../config/iconsMenu.config.js";

const Header = () => {
    const currentRole = useSelector(state => state.auth.currentRole);

    const menuItemsConfig = useItemsConfig();
    const menuIconsConfig = useIconsConfig();

    return (

            <div className={css.header}>
                <MultiLevelDropdownMenu itemsConfig={menuItemsConfig} currentRole={currentRole}/>
                <MultiLevelDropdownMenu itemsConfig={menuIconsConfig} currentRole={currentRole}/>
                <UserInfoComponent/>
            </div>
    );
};

export {Header};