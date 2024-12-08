import Joi from "joi";
import {regexConstant} from "../constants/regex.constants";

const registerValidator = Joi.object({
    name: Joi.string()
        .pattern(regexConstant.userName)
        .required()
        .messages({'string.pattern.base': 'First letter, then letters, digits or "_" min 2 max 20 characters'}),

    password: Joi.string()
        .pattern(regexConstant.password)
        .required()
        .messages({'string.pattern.base': 'min 1 digit, min 1 uppercase, min 1 lowercase, min 1 special character, 8-20 characters'}),
    re_password: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .messages({'any.only': 'passwords does not match'}),

    email:Joi.string()
        .pattern(regexConstant.email)
        .messages({'string.pattern.base':"email not allowed"}),

})

export {registerValidator}