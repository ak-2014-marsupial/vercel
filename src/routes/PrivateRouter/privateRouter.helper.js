import {Navigate, Route} from "react-router-dom";
import React from "react";
import {privateRoutes} from "../../config/privateRouter.config";

const renderRoutes = (routes) => {
    return routes.map((item) => {
        const {component: Component, path, children} = item;
        return (<Route key={path} path={path} element={<Component/>}>
            {children ? renderRoutes(children) : null}
        </Route>)
    });
}

const renderPrivateRoutes = (userRoles) => {
    console.log(userRoles);

    if (userRoles.length === 0) {
        return (<Route path="*" element={<Navigate to="/login" replace/>}/>)
    }
    const allowedRoutes = getAllowedRoutes(privateRoutes, userRoles);
    return renderRoutes(allowedRoutes)

}


const  getAllowedRoutes=(menuItems, roles)=> {
    return menuItems.reduce((acc, item) => {
        const hasPermission = item.permission ? item.permission.some(role => roles.includes(role)) : true;

        if (hasPermission) {
            const newItem = { ...item };
            if (item.children) {
                newItem.children = getAllowedRoutes(item.children, roles);
                if (newItem.children.length === 0) {
                    delete newItem.children; // Удаляем пустые children
                }
            }
            acc.push(newItem);
        }
        return acc;
    }, []);
}

export {
    renderPrivateRoutes,
    getAllowedRoutes,
}




