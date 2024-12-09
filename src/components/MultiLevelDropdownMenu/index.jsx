import React from 'react';

import css from "./MultiLevelDropdown.module.css"
import useItemsConfig from "../../config/menuItems.config";
import {MenuItemsComponent} from "./MenuItems.component";

import {getAllowedRoutes} from "../../routes/PrivateRouter/privateRouter.helper";
import {useSelector} from "react-redux";

const MultiLevelDropdownMenu = () => {
    const currentRole = useSelector(state => state.auth.currentRole);

    const menuItemsConfig = useItemsConfig();
    const allowedRoutes = getAllowedRoutes(menuItemsConfig, currentRole)
    return (
        <nav className={css.nav_area}>
            <ul className={css.menus}>
                {allowedRoutes.map((item, index) => {
                    const depthLevel = 0;
                    return (
                        <MenuItemsComponent items={item} key={index} depthLevel={depthLevel}/>
                    );
                })}
            </ul>
        </nav>
    );
};

export {MultiLevelDropdownMenu};