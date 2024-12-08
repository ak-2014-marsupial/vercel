import React, {useEffect, useState} from 'react';

import css from "./DropDown.module.css"
import {SlArrowDown, SlArrowUp} from "react-icons/sl";


const DropDownComponent = (props) => {
    const {
        items, title, cb = () => {
        }
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    useEffect(() => {
        setSelectedItem(title)
    }, [title]);
    if (!items) return null;


    const itemsToDropList = items.filter(i => i.title !== selectedItem)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const handleItemClick = (item) => {
        setSelectedItem(item?.title);
        setIsOpen(false);
        cb(item)
    }
    if (items.length <= 1) {
        return (
            <div className={css.dropdown}>
                <div className={css.dropdown_toggle}>{selectedItem || ""} </div>
            </div>
        )
    }

    const renderArrow = (isOpen) => {
        return isOpen ? <SlArrowUp className={css.icon}/> : <SlArrowDown className={css.icon}/>
    }

    return (
        <div className={css.dropdown}>
            <button className={css.dropdown_toggle} onClick={toggleDropdown}
            >{selectedItem || ""} {renderArrow(isOpen)}
            </button>

            {isOpen && <ul className={css.dropdown_menu}>
                {itemsToDropList.map(item =>
                    <li key={item._id}
                        onClick={() => handleItemClick(item)}
                    >{item.title}
                    </li>)
                }
            </ul>}
        </div>
    );
};

export {DropDownComponent};