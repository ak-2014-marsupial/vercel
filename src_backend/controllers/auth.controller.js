import {ApiError} from "../errors/api.error";

class AuthController{
    async signUp(req,res){
        try{
            const dto =req.body;
            const result =await authService.signUp(dto);
            res.status(201).json(result);
            return true;
        }catch (e) {
            throw new ApiError("",401)
        }
    }
    async signIn(req,res){
        try{
            const dto =req.body;
            const result =await authService.signIn(dto)
            res.status(201).json(result);
            return true;
        }catch (e) {
            throw new ApiError("",401);
        }
    }
    async refresh(req,res){
        try{
            const jwtPayload =req.res.jwtPayload;
            const oldTokensId=req.res.locals.oldTokensId;
            const result =await authService.refreshTokens(jwtPayload,oldTokensId);
            res.status(201).json(result);
            return true;
        }catch (e) {
            throw new ApiError("",400)
        }
    }
    async logout(req,res){
        try{
            const jwtPayload=req.res.locals.jwtPayload;
            const tokenId=req.res.locals.tokenId;
            await authService.logout(jwtPayload,tokenId);
            res.sendStatus(204);
            return true;
        }catch (e) {
            throw new ApiError("",400);
        }
    }

    async logoutAll(req,res){
        try{
            const jwtPayload=req.res.locals.jwtPayload;
            await authService.logoutAll(jwtPayload);
            res.sendStatus(204)
        }catch (e) {
            throw ApiError("",400)
        }
    }

}