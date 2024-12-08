import React, {useEffect, useRef, useState} from 'react';
import {MultiLevelDropdownMenuComponent} from "./MultiLevelDropdownMenu.component";

import {SlArrowDown, SlArrowUp, SlArrowLeft, SlArrowRight} from "react-icons/sl";
import css from "./MultiLevelDropdown.module.css"
import {NavLink} from "react-router-dom";

const MenuItemsComponent = (props) => {
    const {items, depthLevel} = props;
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    const toggleDropdown = (e, items) => {
        e.stopPropagation();
        setDropdown((prev) => !prev);
        if (items.cb) {
            items.cb(items.title)
        }
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

        if (!items.children) {
            arrow = null
        } else if (depthLevel === 0) {
            arrow = dropdown ? <SlArrowUp className={css.icon}/> : <SlArrowDown className={css.icon}/>
        } else arrow = dropdown ? <SlArrowLeft className={css.icon}/> : <SlArrowRight className={css.icon}/>

        return (
            <button className={css.btn} type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}
                    onClick={(e) => toggleDropdown(e, items)}
            >
                {buttonTitle}
                {arrow}
            </button>
        )
    }

    return (
        <li className={css.menu_items} ref={ref} onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} onClick={closeDropdown}
        >
            {renderButton(items)}
            <MultiLevelDropdownMenuComponent depthLevel={depthLevel} submenus={items.children} dropdown={dropdown}/>
        </li>
    );
};

export {MenuItemsComponent};