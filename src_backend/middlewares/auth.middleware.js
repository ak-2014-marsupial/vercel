import {ApiError} from "../errors/api.error";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";

class AuthMiddleware {

    async checkAccessToken(req, res, params = {}) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Token is not provided", 401)
            }
            const accessToken = header.split("Bearer ")[1];
            const payload = tokenService.checkToken(accessToken, "access");

            const pair = await tokenRepository.findByParams({accessToken});
            if (!pair) {
                throw new ApiError("Token is not valid", 401)
            }
            params["tokenId"] = pair._id;
            params["jwtPayload"] = payload;

            return params;
        } catch (error) {
            throw error
        }
    }

    async checkRefreshToken(req, res, params = {}) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Token is not provided", 401);
            }
            const refreshToken = header.split("Bearer ")[1];
            const payload = tokenService.checkToken(
                refreshToken,
                "refresh",
            );

            const pair = await tokenRepository.findByParams({refreshToken});
            if (!pair) {
                throw new ApiError("Token is not valid", 401);
            }
            params["jwtPayload"] = payload;
            params["oldTokensId"] = pair._id;
            return params;

        } catch (error) {
            throw error;
        }
    }

}

export const authMiddleware = new AuthMiddleware();