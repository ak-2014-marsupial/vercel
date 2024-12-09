import React from 'react';

import css from "./CheckBox.module.css"

const CheckBoxComponent = (props) => {
    const {
        children,
        checked ,
        onChange
    } = props;

    return (
        <label className={css.wrapper}>
            <input type={"checkbox"}
                   checked={checked}
                   onChange={()=>onChange()}
                   className={css.element}/>
            <p>{children}</p>
        </label>
    );
};

export {CheckBoxComponent};