import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../auth.slice";

import css from "./Login.module.css"
import {InputComponent} from "../../../components/Input/Input.component";
import {GoogleAuthButton} from "../GoogleAuthButton";

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
    const navigate = useNavigate();
    const {loginError} = useSelector(state => state.auth);
    const login = async (user) => {
        await dispatch(authActions.login({user}));
        // const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        // if (requestStatus === 'fulfilled') {
        //     navigate('/inventory')
        // }
    };
    return (
        <div className={css.form_wrapper}>
            {loginError && <h5>{loginError}</h5>}
            <form onSubmit={handleSubmit(login)}>
                <GoogleAuthButton/>
                <InputComponent type="text" name="email" registerField="email" register={register}/>
                <InputComponent type="password" name="password" registerField="password" register={register}/>
                <button>login</button>
            </form>
        </div>
    );
};

export {LoginComponent};