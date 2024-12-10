import joi from "joi"

import {regexConstant} from "../constants/regex.constant.js";

export class UserValidator {
    static userName = joi.string().min(3).trim();
    static email = joi
        .string()
        .lowercase()
        .regex(regexConstant.EMAIL)
        .trim();
    static password = joi.string().regex(regexConstant.PASSWORD).trim();
    static phone = joi.string().regex(regexConstant.PHONE).trim();

    static createUser = joi.object({
        name: this.userName.required(),
        email: this.email.required(),
        password: this.password.required(),
        // phone: this.phone.required(),
    });

    static updateUser = joi.object({
        name: this.userName,
        email: this.email,
        phone: this.phone,
    });

    static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}