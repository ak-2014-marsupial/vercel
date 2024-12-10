import React, {useEffect} from 'react';
import {Navigate, useLocation, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {jwtDecode} from "jwt-decode";

import {appConstants} from "../constants/app.constants.js";
import {authActions} from "../features/auth/auth.slice.js";

const RequireAuth = ({children}) => {
    const [searchParams] = useSearchParams();
    const secretKey = searchParams.get("secretKey") || null;
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(appConstants.accessTokenKey)) {
            const token = localStorage.getItem(appConstants.accessTokenKey);
            if (isTokenExpired(token)) {
                localStorage.removeItem(appConstants.accessTokenKey);
                dispatch(authActions.logOut())
            } else {
                // setUser(JSON.parse(localStorage.getItem('user')));
            }
        } else {
            dispatch(authActions.logOut())
        }
    }, [dispatch]);

    const {currentUser} = useSelector(state => state.auth)


    if (!currentUser) {
        return <Navigate to={"/login"} replace state={{from: location,  secretKey}}/>
    }


    return (
        <div>
            {children}
        </div>
    );
};

export  {RequireAuth};

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};