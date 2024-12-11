import React, {useEffect, useRef, useState} from 'react';

import css from "./Dropdown2.module.css"
import {useClickOutside} from "../../hooks/useClickOutside.jsx";
import {SlArrowDown, SlArrowUp} from "react-icons/sl";

const DropdownComponent2 = (props) => {
    const {items, title, titlePrefix, cb} = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const clickRef = useRef();
    useEffect(() => {
        setSelectedItem(title)
    }, [title]);

    useClickOutside(clickRef, () => setIsOpen(false));
    const itemsToDropList = items.filter(i => i !== selectedItem)
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }
    const handleItemClick = (item) => {
        setSelectedItem(item);
        cb(item)
    }
    if (items.length <= 1) {
        return (
            <div className={css.dropdown}>
                <div className={css.dropdown_toggle}>{titlePrefix} {selectedItem || ""} </div>
            </div>
        )
    }


    const renderArrow = (isOpen) => {
        return isOpen ? <SlArrowUp className={css.icon}/> : <SlArrowDown className={css.icon}/>
    }

    if (!items) return null;

    return (
        <div className={css.dropdown} ref={clickRef}>
            <span className={css.dropdown_toggle} onClick={(e) => toggleDropdown(e)}>
                {titlePrefix} {selectedItem || ""} {renderArrow(isOpen)}
            </span>

            {isOpen && <ul className={css.dropdown_menu}>
                {itemsToDropList.map((item, index) =>
                    <li key={index}
                        onClick={() => handleItemClick(item)}
                    >{item}
                    </li>)
                }
            </ul>}
        </div>
    );
};

DropdownComponent2.defaultProps = {
    cb: () => {
    }, // Пустая функция
    titlePrefix: ""
};

export {DropdownComponent2};