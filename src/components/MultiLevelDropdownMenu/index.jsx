import React from 'react';

import css from "./MultiLevelDropdown.module.css"
import {MenuItemsComponent} from "./MenuItems.component";

import {getAllowedRoutes} from "../../routes/PrivateRouter/privateRouter.helper";

const MultiLevelDropdownMenu = ({itemsConfig, currentRole}) => {
    const allowedRoutes = getAllowedRoutes(itemsConfig, currentRole)
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