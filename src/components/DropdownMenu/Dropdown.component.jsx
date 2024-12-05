import React from 'react';
import {MenuItemsComponent} from "./MenuItems.component";

import css from "./Dropdown.module.css";

const DropdownComponent = ({submenus, dropdown, depthLevel}) => {
    if(!submenus) return  null

    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? `${css.dropdown_submenu} ${css.dropdown_border_left}` : css.dropdown_border_top;
    return (
        <ul className={`${css.dropdown} ${dropdownClass} 
            ${dropdown ? `${css.show}` : ''}`
        }
        >
            {submenus.map((item, index) => (
                <MenuItemsComponent items={item} key={index} depthLevel={depthLevel}/>
            ))}
        </ul>
    );
};

export {DropdownComponent};