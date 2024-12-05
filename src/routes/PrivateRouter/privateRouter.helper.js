import {Navigate, Route} from "react-router-dom";
import React from "react";
import {privateRoutes} from "../../config/privateRouter.config";


const intersectionArrays = (...arrays) => {
    if (arrays.length === 0) return [];
    const [firstArray, ...restArrays] = arrays;
    return firstArray.filter((item) => (
        restArrays.every((arr) => arr.includes(item))
    ))
};
const getAllowedRoutes = (routes,roles) => {
    // return privateRoutes.filter(({permission}) => {
    return routes.filter(({permission}) => {
            if (!permission || !isArrayWithLength(permission)) {
                return true;
            } else
                return Boolean(intersectionArrays(permission, roles).length)
        }
    )
}


const isArrayWithLength = (arr) => {
    return Boolean(Array.isArray(arr) && arr.length);
}
const renderRoutes = (routes) => {
    return routes.map((item) => {
        const {component: Component, path, children} = item;
        return (<Route key={path} path={path} element={<Component/>}>
            {children ? renderRoutes(children) : null}
        </Route>)
    });
}

const renderPrivateRoutes = (userRoles) => {
    if (userRoles.length === 0) {
        return (<Route path="*" element={<Navigate to="/login" replace/>}/>)
    }
    const allowedRoutes = getAllowedRoutes(privateRoutes,userRoles);
    return renderRoutes(allowedRoutes)

}

export {
    renderPrivateRoutes,
    getAllowedRoutes
}




