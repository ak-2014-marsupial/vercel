import React, {useEffect, useRef, useState} from 'react';
import {DropdownComponent} from "./Dropdown.component";

import {SlArrowDown, SlArrowUp, SlArrowLeft, SlArrowRight} from "react-icons/sl";
import css from "./Dropdown.module.css"
import {NavLink} from "react-router-dom";

const MenuItemsComponent = ({items, depthLevel}) => {
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

    const toggleDropdown = (e,items) => {
        e.stopPropagation();

        setDropdown((prev) => !prev);

        if(items.cb){
            items.cb(items.title)
            console.log(items.title);
        }

    }

    const renderButton = (items) => {
        let arrow, buttonTitle;
        if (items.path) {
            buttonTitle = <NavLink to={items.path}>{items.title}</NavLink>
        } else buttonTitle = items.title;

        if (!items.children) {
            arrow = null
        } else if (depthLevel === 0) {
            arrow = dropdown ? <SlArrowUp/> : <SlArrowDown/>
        } else arrow = dropdown ? <SlArrowLeft/> : <SlArrowRight/>

        return (
            <button className={css.btn} type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}
                    onClick={(e) => toggleDropdown(e,items)}
            >
                {buttonTitle}
                <div className={css.icon}>{arrow}</div>
            </button>
        )
    }

    return (
        <li className={css.menu_items} ref={ref} onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} onClick={closeDropdown}
        >
            {renderButton(items)}
            <DropdownComponent depthLevel={depthLevel} submenus={items.children} dropdown={dropdown}/>
        </li>
    );
};

export {MenuItemsComponent};