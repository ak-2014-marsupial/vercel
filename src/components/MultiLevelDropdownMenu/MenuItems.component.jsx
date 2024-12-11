import React, {useRef, useState} from 'react';
import {MultiLevelDropdownMenuComponent} from "./MultiLevelDropdownMenu.component";

import {SlArrowDown, SlArrowUp, SlArrowLeft, SlArrowRight} from "react-icons/sl";
import css from "./MultiLevelDropdown.module.css"
import {NavLink} from "react-router-dom";
import {useClickOutside} from "../../hooks/useClickOutside";
import {useSelector} from "react-redux";

const MenuItemsComponent = (props) => {
    const {items, depthLevel} = props;
    const [dropdown, setDropdown] = useState(false);
    const isDropdownOnHover = useSelector(state => state.app.isDropdownOnHover)

    const clickRef = useRef();

    const handleClickOutside = () => {
        setDropdown(false);
    }
    useClickOutside(clickRef, handleClickOutside)


    const onMouseEnter = () => {
        // window.innerWidth > 960 && setDropdown(true);
        Boolean(isDropdownOnHover) && setDropdown(true);
    };

    const onMouseLeave = () => {
        Boolean(isDropdownOnHover) && setDropdown(false);
    };

    const closeDropdown = (items) => {
        dropdown && setDropdown(false);
    };

    const toggleDropdown = (e, items) => {
        if (items.children) {
            e.stopPropagation();
        }
        if (items.cb) {
            items.cb(items.title)
        }

        setDropdown((prev) => !prev);
    }

    const renderButton = (items) => {
        const {component: Component, props} = items
        let arrow, buttonTitle;
        if (items.path) {
            buttonTitle = <NavLink to={items.path}>{items.title}</NavLink>
        } else if (items.component) {
            buttonTitle = <>
                <div>{items.title}</div>
                <Component {...props}/></>
        } else buttonTitle = items.title;

        if (!items.children || items.noArrow) {
            arrow = null
        } else if (depthLevel === 0) {
            arrow = dropdown ? <SlArrowUp className={css.icon}/> : <SlArrowDown className={css.icon}/>
        } else arrow = dropdown ? <SlArrowLeft className={css.icon}/> : <SlArrowRight className={css.icon}/>

        return (
            <button className={ depthLevel>0?`${css.btn} ${css.item_border}`:css.btn  } type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}
                    onClick={(e) => toggleDropdown(e, items)}
            >
                {buttonTitle}
                {arrow}
            </button>
        )
    }

    return (
        <li className={css.menu_items} ref={clickRef} onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} onClick={(items?.isOpenAfterClick) ? () => {
        } : closeDropdown}
        >
            {renderButton(items)}
            <MultiLevelDropdownMenuComponent depthLevel={depthLevel} submenus={items.children} dropdown={dropdown}/>
        </li>
    );
};

export {MenuItemsComponent};