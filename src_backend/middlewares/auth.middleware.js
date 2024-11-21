import {ApiError} from "../errors/api.error";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";

class AuthMiddleware {

    async checkAccessToken(req, res) {
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
            req.res.locals.tokenId = pair._id;
            req.res.locals.jwtPayload = payload;
            return true;
        } catch (e) {
            throw new ApiError("Token is not valid", 401)
        }
    }

}

export const authMiddleware = new AuthMiddleware();