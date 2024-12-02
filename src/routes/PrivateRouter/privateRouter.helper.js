import {Route} from "react-router-dom";
import React from "react";
import {privateRoutes} from "../../config/privateRouter.config";


const intersectionArrays = (...arrays) => {
    if (arrays.length === 0) return [];
    const [firstArray, ...restArrays] = arrays;
    return firstArray.filter((item) => (
        restArrays.every((arr) => arr.includes(item))
    ))
};
const getAllowedRoutes = (roles) => {
    return privateRoutes.filter(({permission}) => {
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

const renderPrivateRoutes = (userRoles) => {
    const allowedRoutes = getAllowedRoutes(userRoles);
    return allowedRoutes.map(({component: Component, path}) => (
        <Route key={path} path={path} element={<Component/>}/>
    ));
}

export {
    renderPrivateRoutes,
}




