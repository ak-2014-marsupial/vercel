import {userRepository} from "../repositories/user.repository";

class UserService{

    async getAll() {
        return await userRepository.getAll();
    }

    async getById(userId){
        return await userRepository.getById(userId);
    }

     async getMe(userId){
        return await userRepository.getById(userId);
    }

     async updateMe(userId, dto){
        return await userRepository.updateById(userId, dto);
    }

     async deleteMe(userId){
        await userRepository.deleteById(userId);
    }
}

export const userService =new UserService();