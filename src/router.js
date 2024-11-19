import {InventoryPage} from "./Pages/InventoryPage";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {RequireAuth} from "./hoc/RequireAuth";
import {AboutPage} from "./Pages/AboutPage";
import React from "react";
import {MainLayout} from "./layouts/MainLayout";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {textConstants} from "./constants/text.constant";

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