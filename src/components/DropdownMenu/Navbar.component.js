import React from 'react';

import css from "./Dropdown.module.css"
import useItemsConfig from "../../config/menuItems.config";
import {MenuItemsComponent} from "./MenuItems.component";

import {getAllowedRoutes} from "../../routes/PrivateRouter/privateRouter.helper";
import {useSelector} from "react-redux";

const NavbarComponent = () => {
    const currentUser = useSelector(state => state.auth.currentUser);
    const roles = currentUser?.role || [];

    const menuItemsConfig = useItemsConfig();
    const allowedRoutes = getAllowedRoutes(menuItemsConfig, roles)
    console.log(getAllowedRoutes(menuItemsConfig, roles));
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

export {NavbarComponent};