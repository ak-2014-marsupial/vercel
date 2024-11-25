import React, {useState} from 'react';

import css from "./input.module.css"
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";


const InputComponent = ({
                            type, name, placeholder = "", registerField = "", register = (registerField) => {
    }, errors = null
                        }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const renderIcon = () => {
        return (
            <i className={css.i}
               onClick={() => (setIsPasswordShown(prevState => !prevState))}
            >{isPasswordShown ? <FaEyeSlash/> : <FaEye/>}</i>
        )
    }
    const renderError = () => {
        if (!errors || !errors[registerField]) {
            return null;
        } else {
            return <span className={css.error}>{errors[registerField].message}</span>
        }
    }

    return (
        <>
            <div className={css.input_group}>
                <input className={css.input}
                       type={isPasswordShown ? "text" : type}
                       placeholder={placeholder}
                       {...register(registerField)}
                />
                <label className={css.placeholder}>{name}</label>
                {type === "password" ? renderIcon() : null}
                {renderError()}
            </div>

        </>

    )
}


export {InputComponent};