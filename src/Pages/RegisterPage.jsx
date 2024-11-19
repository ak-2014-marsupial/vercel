import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {authService} from "../services/authService";

const RegisterPage = () => {
    const [error, setError] = useState(false)
    const {register, reset, handleSubmit} = useForm({
        defaultValues: {
            email: "andrew_1@gmail.com",
            password: "A123456789$",
            name:"Andrew_1",
            age:"20"
        }
    });
    const registerUser = async (user) => {
        try {
            await authService.signUp(user);
            setError(false)
        } catch (e) {
            setError(true)
        }
    }

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={"email"} {...register("email")}/>
            <input type="text" placeholder={"password"} {...register("password")}/>
            <input type="text" placeholder={"name"} {...register("name")}/>
            <input type="text" placeholder={"age"} {...register("age")}/>
            <button>Register</button>
            {error && <div>UserName already exist</div>}
        </form>
    );
};

export {RegisterPage};