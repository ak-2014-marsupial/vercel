import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {authActions} from "../auth.slice";
import {joiResolver} from "@hookform/resolvers/joi";

import css from "./Register.module.css"
import {registerValidator} from "../../../validators/register.validator";
import {InputComponent} from "../../../components/Input/Input.component";
import {GoogleAuthButton} from "../GoogleAuthButton";

const RegisterComponent = () => {
    const dispatch = useDispatch();
    const {registerError} = useSelector(state => state.auth);
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
        await dispatch(authActions.register({user}));
        // const {meta: {requestStatus}} = await dispatch(authActions.register({user}));
        // if (requestStatus === 'fulfilled') {
        //     navigate('/login')
        // }
    };

    return (
        <div className={css.form_wrapper}>
            {registerError && <h5>{registerError}</h5>}
            <form onSubmit={handleSubmit(registerUser)}>
                <GoogleAuthButton/>
                <InputComponent type="text" name="email" registerField="email"
                                register={register} errors={errors}/>
                <InputComponent type="password" name="password" registerField="password"
                                register={register} errors={errors}/>
                <InputComponent type="password" name="Confirm password" registerField="re_password"
                                register={register} errors={errors}/>
                <InputComponent type="text" name="name" registerField="name"
                                register={register} errors={errors}/>

                <button disabled={!isValid} type="submit">Register</button>
            </form>
        </div>
    );
};

export {RegisterComponent};