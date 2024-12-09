import React from 'react';

import css from "./Line.module.css"

const LineComponent = ({children}) => {
    return (
        <div className={css.line}>
            {children}
        </div>
    );
};

export  {LineComponent};