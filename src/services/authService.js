import {appConstants} from "../constants/appConstants";
import {apiService} from "./apiService";
import {urls} from "../constants/urlsConstants";

const authService = {
    setTokens: ({accessToken, refreshToken}) => {
        localStorage.setItem(appConstants.accessTokenKey, accessToken)
        localStorage.setItem(appConstants.refreshTokenKey, refreshToken)
    },
    signIn: async (user) => {
        const {data} = await apiService.post(urls.auth.signIn, user);
        this.setTokens(data)
        const {data: me} = await this.me();
        console.log(me);
    },
    refreshTokens: async () => {
        const refreshToken = this.getRefreshToken();
        const {data} = await apiService.post(urls.auth.refresh, {refreshToken});
        this.setTokens(data);
    },
    getAccessToken: () => {
        localStorage.getItem(appConstants.accessTokenKey)
    },
    getRefreshToken: () => {
        localStorage.getItem(appConstants.refreshTokenKey)
    },
    deleteTokens: () => {
        localStorage.removeItem(appConstants.accessTokenKey);
        localStorage.removeItem(appConstants.refreshTokenKey);
    },
    signUp: (user) => {
        console.log("urls.auth.signUp>>",urls.auth.signUp);
        return apiService.post(urls.auth.signUp, user)
    },
    getMe: () => {
        return apiService.get(urls.user.me)
    }
}

export {authService}