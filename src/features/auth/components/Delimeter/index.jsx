import React from 'react';

import css from "./Delimemter.module.css"

const DelimiterComponent = ({children}) => {
    return (
        <div className={css.delimiter}>
            <span className={css.text}>{children}</span>

        </div>
    );
};

export  {DelimiterComponent};