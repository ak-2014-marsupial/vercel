import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {authActions} from "../../redux/slices/auth.slice";
import {joiResolver} from "@hookform/resolvers/joi";

import css from "./Register.module.css"
import {registerValidator} from "../../validators/register.validator";
import {InputComponent} from "../Input/Input.component";
import {GoogleLogin} from "@react-oauth/google";

const RegisterComponent = () => {
    const dispatch = useDispatch();
    const {registerError} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm(
        {
            mode: "onBlur",
            resolver: joiResolver(registerValidator),
            defaultValues: {
                email: "andrew_1@gmail.com",
                password: "A123456789$",
            }
        }
    );
    const registerUser = async (user) => {
        delete user.re_password;
        const {meta: {requestStatus}} = await dispatch(authActions.register({user}));

        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    };
    const handleLoginSuccess = (credentialResponse) => {
        console.log("Google handle Login Success");
        dispatch(authActions.signInWithGoogle({credentialResponse}))
    };
    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <div className={css.form_wrapper}>
            <GoogleLogin onSuccess={handleLoginSuccess}
                         onError={handleLoginError}/>

            {registerError && <h5>{registerError}</h5>}
            <form onSubmit={handleSubmit(registerUser)}>
                <InputComponent type="text" name="email" registerField="email"
                                register={register} errors={errors}/>
                <InputComponent type="password" name="password" registerField="password"
                                register={register} errors={errors}/>
                <InputComponent type="password" name="Confirm password" registerField="re_password"
                                register={register} errors={errors}/>
                <InputComponent type="text" name="name" registerField="name"
                                register={register} errors={errors}/>
                <InputComponent type="text" name="age" registerField="age"
                                register={register} errors={errors}/>

                <button disabled={!isValid} type="submit">Register</button>
            </form>
        </div>
    );
};

export {RegisterComponent};