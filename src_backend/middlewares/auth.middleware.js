import axios from "axios";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

import {ApiError} from "../errors/api.error.js";
import {tokenService} from "../services/token.service.js";
import {tokenRepository} from "../repositories/token.repository.js";
import {configs} from "../configs/config.js";

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

    async checkGoogleCredential(req, res, params = {}) {
        try {
            const token = req.body.credential;
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/certs');
            const keys = response.data.keys;

            // Decode the token to get the header
            const decodedHeader = jwt.decode(token, {complete: true});
            const kid = decodedHeader.header.kid;
            // Find the corresponding public key
            const key = keys.find(k => k.kid === kid);

            if (!key) {
                throw new ApiError("Public key not found", 401);
            }
            const pemKey = jwkToPem(key);

            // Verify the token using the public key
            const verifiedToken = jwt.verify(token, pemKey, {
                algorithms: ['RS256'],
                audience: configs.GOOGLE_CLIENT_ID,
            });
            params["email"] = verifiedToken.email;
            params["googleId"] = verifiedToken.sub;
            params["given_name"] = verifiedToken.given_name;
            params["family_name"] = verifiedToken.family_name;

            return params;
        } catch (error) {
            throw error;
        }
    }

}

export const authMiddleware = new AuthMiddleware();