import React from 'react';
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";

import {authActions} from "./auth.slice.js";

const GoogleAuthButton = () => {
    const dispatch = useDispatch();
    const handleLoginSuccess = (credentialResponse) => {
        dispatch(authActions.signInWithGoogle({credentialResponse}))
    };
    const handleLoginError = () => {
        console.log('Login Failed');
    };
    return (
        <GoogleLogin onSuccess={handleLoginSuccess}
                     onError={handleLoginError}/>
    );
};

export {GoogleAuthButton};