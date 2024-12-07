import {userRepository} from "../repositories/user.repository";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {ApiError} from "../errors/api.error";
import {passwordService} from "./password.service";

class AuthService {
    async signUp(dto) {
        try {
            const existUser = await userRepository.getByParams({email: dto.email});
            if (existUser) {
                const provider = existUser.provider.toString();
                if (provider !== "email/password") {
                    throw new ApiError(`Пользователь с таким email уже зарегистрирован. Якщо бажаєте додати пароль або змінити свої дані, спочатку ввійдіть в додаток за допамогою ${provider}`, 401)
                } else throw new ApiError("Пользователь с таким email уже зарегистрирован", 409);
            }
            const password = await passwordService.hashPassword(dto.password);
            const user = await userRepository.create({...dto, password});

            const tokens = await tokenService.generatePair({userId: user._id, role: user.role})
            await tokenRepository.create({...tokens, _userId: user._id});
            return {user, tokens};

        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 500);
        }
    }

    async signIn(dto) {
        try {
            const user = await userRepository.getByParams({email: dto.email});
            if (!user) {
                throw new ApiError("Invalid credentials", 401);
            }
            const tokens = await tokenService.generatePair({userId: user._id, role: user.role});
            await tokenRepository.create({...tokens, _userId: user._id});
            return {user, tokens}
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 500);
        }
    }

    async googleAuth(dto) {

        try {
            let user = await userRepository.getByParams({email: dto.email});
            console.log("auth.service: ",user);
            if (!user) {
                // user = await userRepository.create(dto);
                user = await userRepository.create({
                    ...dto,
                    name: `${dto.given_name} ${dto.family_name}`,
                    provider: "google",
                    isVerified: true
                });
            } else {
                user = await userRepository.updateById(user._id, dto);
            }
            const tokens = await tokenService.generatePair({userId: user._id, role: user.role});
            await tokenRepository.create({...tokens, _userId: user._id});
            return {user, tokens}
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 500);
        }
    }

    async refreshTokens(payload, oldTokenId) {
        try {
            const tokens = await tokenService.generatePair({
                userId: payload.userId,
                role: payload.role
            });
            await tokenRepository.create({...tokens, _userId: payload.userId});
            await tokenRepository.deleteById(oldTokenId);
            return tokens;
        } catch (error) {
            throw new ApiError(`${error.message}`, error?.status || 500);
        }
    }

    async logout(payload, tokenId) {
        await tokenRepository.deleteById(tokenId);
    }

    async logoutAll(payload) {
        await tokenRepository.deleteByParams({_userId: payload.userId});
    }
}

export const authService = new AuthService()