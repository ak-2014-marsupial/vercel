import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";

import {InventoryPage} from "../Pages/InventoryPage.jsx";
import {RequireAuth} from "../hoc/RequireAuth.jsx";
import {AboutPage} from "../Pages/AboutPage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {LoginPage} from "../Pages/LoginPage.jsx";
import {RegisterPage} from "../Pages/RegisterPage.jsx";
import {textConstants} from "../constants/text.constant.js";

// const router = createHashRouter([
const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'inventory'} replace/>},
            {path: "about", element: <AboutPage/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "inventory", element: <RequireAuth><InventoryPage/></RequireAuth>},
            {path: "*", element: <div>NoPage</div>}
        ]
    },

])

export {router};

export const navBarLinks = [
    {title: textConstants.inventory, goTo: "/inventory"},
    {title: textConstants.register, goTo: "/register"},
    {title: textConstants.login, goTo: "/login"},
    {title: textConstants.about, goTo: "/about"},
]