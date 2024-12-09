import React from 'react';

import css from "./Border.module.css";

const BorderComponent = ({children}) => {
    return (
        <div className={css.border}>
            {children}
        </div>
    );
};

export default BorderComponent;