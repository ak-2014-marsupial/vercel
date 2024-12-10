import bcrypt from "bcrypt";

import {configs} from "../configs/config.js";

class PasswordService{
    async hashPassword(password){
        return await bcrypt.hash(password,configs.SALT_ROUNDS)
    }

    async comparePassword(password,hash){
        return await bcrypt.compare(password,hash)
    }
}

export const passwordService= new PasswordService()