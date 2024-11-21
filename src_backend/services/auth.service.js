import {userRepository} from "../repositories/user.repository";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {ApiError} from "../errors/api.error";
import {passwordService} from "./password.service";

class AuthService {
    async signUp(dto) {
        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({...dto, password});
        const tokens = await tokenService.generatePair({userId: user._id, role: user.role})
        await tokenRepository.create({...tokens, _userId: user._id});
        return {user, tokens}
    }

    async signIn(dto) {
        const user = await userRepository.getByParams({email: dto.email});
        if (!user) {
            throw new ApiError("Invalid credentials", 401);
        }
        const tokens = await tokenService.generatePair({userId: user._id, role: user.role});
        await tokenRepository.create({...tokens, _userId: user._id});
        return {user, tokens}
    }

    async refresh(payload, oldTokenId) {
        const tokens = await tokenService.generatePair({
            userId: payload.userId,
            role: payload.role
        });
        await tokenRepository.create({...tokens, _userId: payload.userId});
        await tokenRepository.deleteById(oldTokenId);
        return tokens;
    }
     async logout(payload, tokenId){
        await tokenRepository.deleteById(tokenId);
    }

     async logoutAll(payload) {
        await tokenRepository.deleteByParams({ _userId: payload.userId });
    }
}

export const authService = new AuthService()