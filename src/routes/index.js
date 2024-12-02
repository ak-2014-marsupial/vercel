import {InventoryPage} from "../Pages/InventoryPage";
import { HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {AboutPage} from "../Pages/AboutPage";
import React from "react";
import {MainLayout} from "../layouts/MainLayout";
import {LoginPage} from "../Pages/LoginPage";
import {RegisterPage} from "../Pages/RegisterPage";
import {textConstants} from "../constants/text.constant";
import { renderPrivateRoutes} from "./PrivateRouter/privateRouter.helper";

// const router = createHashRouter([
const AppRouter = ()=>{
    const userRoles = ["manager"]
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>} >
                    <Route index element={<Navigate to="inventory"/>}/>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="inventory" element={<InventoryPage/>}/>

                    {renderPrivateRoutes(userRoles)}

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