import React from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {HomePage} from "../Pages/Home.jsx";
import {textConstants} from "../constants/text.constant.js";
import {renderPrivateRoutes} from "./PrivateRouter/privateRouter.helper.js";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {AboutPage} from "../Pages/AboutPage.jsx";
import {LoginPage} from "../Pages/LoginPage.jsx";
import {RegisterPage} from "../Pages/RegisterPage.jsx";


// const router = createHashRouter([
const AppRouter = () => {
    const {currentRole} = useSelector(state => state.auth)
    const currentRoles = currentRole? new Array(currentRole):[];
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Navigate to="home"/>}/>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    {renderPrivateRoutes(currentRoles)}
                    <Route path="*" element={<h1>NoPage</h1>}/>

                </Route>
            </Routes>
        </HashRouter>
    )
}

export {AppRouter};

export const navBarLinks = [
    {title: textConstants.inventory, goTo: "/inventory"},
    {title: textConstants.register, goTo: "/register"},
    {title: textConstants.login, goTo: "/login"},
    {title: textConstants.about, goTo: "/about"},
]