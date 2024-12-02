import {apiService} from "./apiService";
import {appConstants} from "../constants/app.constants";
import {urls} from "../constants/urls.constants";


const authService = {
    register(user) {
        return apiService.post(urls.auth.signUp, user)
    },
    registerWithGoogle(credentialResponse){
        return apiService.post(urls.auth.signInWithGoogle, credentialResponse)
    },
    async login(user) {
        const {data:{tokens}} = await apiService.post(urls.auth.signIn, user);
        this.setTokens(tokens)
        const {data: me} = await this.me();
        return me
    },
    async refresh() {
        const refreshToken = this.getRefreshToken();
        const {data} = await apiService.post(urls.auth.refresh, {refreshToken});
        this.setTokens(data)
    },
    me() {
        return apiService.get(urls.auth.me)
    },
    setTokens({accessToken, refreshToken}) {
        localStorage.setItem(appConstants.accessTokenKey, accessToken)
        localStorage.setItem(appConstants.refreshTokenKey, refreshToken)
    },
    getAccessToken() {
        return localStorage.getItem(appConstants.accessTokenKey)
    },
    getRefreshToken(){
        return localStorage.getItem(appConstants.refreshTokenKey)
    },
    deleteTokens(){
        localStorage.removeItem(appConstants.accessTokenKey)
        localStorage.removeItem(appConstants.refreshTokenKey)
    }
}

export {
    authService
}