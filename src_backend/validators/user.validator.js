import joi from "joi"
import {regexConstant} from "../constants/regex.constant";

export class UserValidator {
    static userName = joi.string().min(3).trim();
    static age = joi.number().min(15).max(50);
    static email = joi
        .string()
        .lowercase()
        .regex(regexConstant.EMAIL)
        .trim();
    static password = joi.string().regex(regexConstant.PASSWORD).trim();
    static phone = joi.string().regex(regexConstant.PHONE).trim();

    static createUser = joi.object({
        name: this.userName.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        // phone: this.phone.required(),
    });

    static updateUser = joi.object({
        name: this.userName,
        age: this.age,
        email: this.email,
        phone: this.phone,
    });

    static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}