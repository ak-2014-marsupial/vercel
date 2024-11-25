import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {authActions} from "../../redux/slices/auth.slice";
import {joiResolver} from "@hookform/resolvers/joi";

import css from "./Register.module.css"
import {registerValidator} from "../../validators/register.validator";
import {FaEye, FaEyeSlash} from "react-icons/fa";

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
        }
    );
    const registerUser = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register({user}));

        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    };
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const renderIcon = () => {
        return (
            <i className={css.i}
               onClick={() => (setIsPasswordShown(prevState => !prevState))}
            >{isPasswordShown ? <FaEyeSlash/> : <FaEye/>}</i>
        )
    }

    const renderInput = ({type, name, registerField}) => {
        return (
            <>
                <div className={css.input_group}>
                    <input className={css.input}
                           type={isPasswordShown ? "text" : type}
                           {...register(registerField)}
                           placeholder=""/>
                    <label className={css.placeholder}>{name}</label>
                    {type === "password" ? renderIcon() : null}
                </div>
                {errors[registerField] &&
                    <span style={{color: 'red', fontSize: "10px"}}>{errors[registerField].message}</span>}
            </>

        )
    }

    return (
        <div className={css.form_wrapper}>
            {registerError && <h5>{registerError}</h5>}
            <form onSubmit={handleSubmit(registerUser)}>
                {/*<InputComponent type="text" name="email" registerField="email"*/}
                {/*                register={register} errors={errors}/>*/}
                {/*<InputComponent type="password" name="password" registerField="password"*/}
                {/*                register={register} errors={errors}/>*/}
                {/*<InputComponent type="password" name="Confirm password" registerField="re_password"*/}
                {/*                register={register} errors={errors}/>*/}
                {/*<InputComponent type="text" name="name" registerField="name"*/}
                {/*                register={register} errors={errors}/>*/}
                {/*<InputComponent type="text" name="age" registerField="age"*/}
                {/*                register={register} errors={errors}/>*/}

                {renderInput({type: "text", name: "email", registerField: "email"})}
                {renderInput({type: "password", name: "password", registerField: "password"})}
                {renderInput({type: "password", name: "Confirm password", registerField: "re_password"})}
                {renderInput({type: "text", name: "userName", registerField: "name"})}
                {renderInput({type: "text", name: "age", registerField: "age"})}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export {RegisterComponent};