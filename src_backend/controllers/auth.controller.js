import {ApiError} from "../errors/api.error";
import {authService} from "../services/auth.service";

class AuthController {
    async signUp(req, res, params = {}) {
        try {
            const dto = req.body;
            const result = await authService.signUp(dto);
            res.status(201).json(result);

            return null;
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 401)
        }
    }

    async signIn(req, res, params = {}) {

            const dto = req.body;
            const result = await authService.signIn(dto)
            res.status(201).json(result);
            return null;

    }

    async signInWithGoogle(req, res, params = {}) {
        const result = await authService.googleAuth(params);
        res.status(201).json(result);
        try {
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 401);
        }

    }

    async refresh(req, res, params = {}) {
        console.log("authController >>", params);
        try {
            const jwtPayload = params.jwtPayload;
            const oldTokensId = params.oldTokensId;
            const result = await authService.refreshTokens(jwtPayload, oldTokensId);
            res.status(201).json(result);
            return null;
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 401)
        }
    }

    async logout(req, res, params = {}) {
        try {
            const jwtPayload = params.jwtPayload;
            const tokenId = params.tokenId;
            await authService.logout(jwtPayload, tokenId);
            res.status(204).json({message: "logout", status: 204});
            return null;
        } catch (error) {
            throw new ApiError(`${error.message}`, 400);
        }
    }

    async logoutAll(req, res, params = {}) {
        try {
            const jwtPayload = params.jwtPayload;
            await authService.logoutAll(jwtPayload);
            res.sendStatus(204);
            return null;
        } catch (error) {
            throw ApiError(`${error.message}`, 400)
        }
    }

}

export const authController = new AuthController();