import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../auth.slice";

import css from "./Login.module.css"
import {InputComponent} from "../../../components/Input/Input.component";
import {GoogleAuthButton} from "../GoogleAuthButton";
import {DelimiterComponent} from "../components/Delimeter";
import BorderComponent from "../../../components/Border";
import {Link} from "react-router-dom";

const initDataForm = {
    defaultValues: {
        email: "andrew_1@gmail.com",
        password: "A123456789$",
    }
}

const LoginComponent = () => {

    const {
        register,
        handleSubmit

    } = useForm(initDataForm);
    const dispatch = useDispatch();
    const {loginError} = useSelector(state => state.auth);
    const login = async (user) => {
        await dispatch(authActions.login({user}));
        // const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        // if (requestStatus === 'fulfilled') {
        //     navigate('/inventory')
        // }
    };
    return (
        <BorderComponent>
            <div className={css.form_wrapper}>
                <h1>Login</h1>
                {loginError && <h5>{loginError}</h5>}
                <form onSubmit={handleSubmit(login)} className={css.form_wrapper}>
                    <InputComponent type="text" name="email" registerField="email" register={register}/>
                    <InputComponent type="password" name="password" registerField="password" register={register}/>
                    <button>login</button>
                </form>
                <div>Don`t have an account  <Link to={"/register"}>SignUp</Link></div>
                <DelimiterComponent>OR</DelimiterComponent>
                <GoogleAuthButton/>
            </div>
        </BorderComponent>
    );
};

export {LoginComponent};