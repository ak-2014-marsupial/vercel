import {userService} from "../services/user.service.js";

class UserController{
    async getAll(req, res) {
        try {
            const result = await userService.getAll();
            res.json(result);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getById(req, res,params) {
        console.log("user controller: ",params);
        try {
            const userId = params.userId;
            const result = await userService.getById(userId);
            res.json(result);

            return true
        } catch (error) {
           throw error;
        }
    }
    async getMe(req, res,params) {
        try {
            const userId = params.jwtPayload.userId ;
            const result = await userService.getMe(userId);
            res.json(result);
            return true
        } catch (error) {
           throw error;
        }
    }
    async updateMe(req, res,params) {
        try {
            const userId = params.jwtPayload.userId ;
            const dto = req.body ;

            const result = await userService.updateMe(userId, dto);
            res.status(201).json(result);
            return true
        } catch (error) {
            throw error;
        }
    }

    async deleteMe(req, res,params) {
        try {
            const userId = params.jwtPayload.userId;
            await userService.deleteMe(userId);
            res.status(204).json({message:`user by ${userId} was deleted`,status:204});
            return true
        } catch (error) {
            throw error;
        }
    }

}

export const userController =new UserController();