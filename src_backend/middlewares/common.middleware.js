import {isObjectIdOrHexString} from "mongoose";

import {ApiError} from "../errors/api.error.js";

class CommonMiddleware {
    isValid(paramName) {
        return (req, res, params = {}) => {
            try {
                const id = req.params[paramName];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError("Invalid id", 400);
                }
                return null;
            } catch (error) {
                throw error
            }
        }
    }

    isBodyValid(validator) {
        return async (req, res, params = {}) => {
            try {
                req.body = await validator.validateAsync(req.body);
                return null;
            } catch (error) {
                throw new ApiError(error.details[0].message, 400);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();