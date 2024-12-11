import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import {Header} from "../components/Header/Header.jsx";
import LoaderComponent from "../components/Loader/Loader.component.jsx";

const MainLayout = () => {
    const {fontSize} = useSelector(state => state.app);

    useEffect(() => {
        document.documentElement.style.fontSize=`${fontSize}px`
    }, [fontSize]);


    return (
        <div className="container">
            <Header/>
             <LoaderComponent/>
            <div className="outlet">
            <Outlet />
            </div>
        </div>
    );
};

export  {MainLayout};