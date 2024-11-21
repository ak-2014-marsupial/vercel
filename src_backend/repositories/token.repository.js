import {Token} from "../models/token.model";

class TokenRepository {
    async create(dto) {
        return Token.create(dto)
    }

    async findByParams(params) {
        return Token.findOne(params)
    }

    async deleteById(id) {
        await Token.deleteOne({_id: id});
    }

    async deleteByParams(params) {
        await Token.deleteMany(params);
    }
}

export const tokenRepository = new TokenRepository()