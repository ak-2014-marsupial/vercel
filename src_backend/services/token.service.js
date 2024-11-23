import * as jsonwebtoken from "jsonwebtoken";
import {configs} from "../configs/config";
import {ApiError} from "../errors/api.error";

class TokenService {
    async generatePair(payload) {
        const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN});
        const refreshToken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN});
        return {accessToken, refreshToken}
    }

    checkToken(token, typeToken) {

        try {
            let secret;
            switch (typeToken) {
                case "access":
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError("Token type is not valid", 401);
            }
            return jsonwebtoken.verify(token, secret);
        } catch (e) {
            throw new ApiError("Token is not valid", 401)
        }
    }


}

export const tokenService = new TokenService();