import React from 'react';
import {Header} from "../components/Header/Header";
import {Outlet} from "react-router-dom";
import LoaderComponent from "../components/Loader/Loader.component";

const MainLayout = () => {

    return (
        <div>
            <Header/>
             <LoaderComponent/>
            <Outlet/>
        </div>
    );
};

export  {MainLayout};