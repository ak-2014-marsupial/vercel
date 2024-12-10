import React from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../components/Header/Header.jsx";
import LoaderComponent from "../components/Loader/Loader.component.jsx";

const MainLayout = () => {

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