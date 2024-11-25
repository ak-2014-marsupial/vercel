import React from 'react';

import css from "./Loader.module.css"
import {useSelector} from "react-redux";

const LoaderComponent = () => {
    const {isLoading}=useSelector(state=>state.loadingReducer)
    if(!isLoading) {
        return null
    };
    return (
        <div className={css.loading}>
            
        </div>
    );
};

export default LoaderComponent;