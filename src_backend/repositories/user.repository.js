import {User} from "../models/user.model";

class UserRepository {

    async _populateRoles(query) {
        if(!query) return null;
        return query.populate({
            path: "roles",
            select: "title rate",
            options: {sort: {rate: 1}}
        });
    }


    async getByParams(params) {
        const user = await User.findOne(params);
        // console.log("user repository: ", {params, user});
        return this?._populateRoles(user);
    }

    async getAll() {
        const users = await User.find();
        return this?._populateRoles(users);

    }

    async create(dto) {
        const user =await User.create(dto);
        return this?._populateRoles(user);
    }

    async getById(userId) {
        const user= await User.findById(userId);
        return this?._populateRoles(user);
    }

    async updateById(userId, dto) {
        const user= await User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
        return this?._populateRoles(user);
    }

    async deleteById(userId) {
        await User.deleteOne({_id: userId});
    }
}

export const userRepository = new UserRepository()