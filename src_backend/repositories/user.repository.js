import {User} from "../models/user.model";

class UserRepository {
    async getByParams(params) {
        return User.findOne(params);
    }

    async getAll() {
        return User.find();
    }

    async create(dto) {
        return User.create(dto);
    }

    async getById(userId) {
        return User.findById(userId);
    }

    async updateById(userId, dto) {
        return User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }

    async deleteById(userId) {
        await User.deleteOne({_id: userId});
    }
}

export const userRepository = new UserRepository()