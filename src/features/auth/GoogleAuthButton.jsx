import React from 'react';
import {GoogleLogin} from "@react-oauth/google";
import {authActions} from "./auth.slice";
import {useDispatch} from "react-redux";

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