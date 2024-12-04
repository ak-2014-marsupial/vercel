import React from 'react';
import {Outlet} from "react-router-dom";

const UsersPage = () => {
    return (
        <div>
            UsersPage
            <Outlet/>
        </div>
    );
};

export  {UsersPage};