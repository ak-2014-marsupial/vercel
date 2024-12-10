import {apiService} from "./apiService.js";
import {appConstants} from "../constants/app.constants.js";
import {urls} from "../constants/urls.constants.js";


const authService = {
    register(user) {
        return apiService.post(urls.auth.signUp, user)
    },
    async registerWithGoogle(credentialResponse){
        const {data:{user,tokens}}= await apiService.post(urls.auth.signInWithGoogle, credentialResponse);
        this.setTokens(tokens);
        return user;
    },
    async login(user) {
        const {data:{user:me,tokens}} = await apiService.post(urls.auth.signIn, user);
        this.setTokens(tokens)
        // const {data: me} = await this.me();
        return me;
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