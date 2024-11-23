const baseURL = process.env.REACT_APP_BASE_URL;

const auth = "/api/auth";
const users = "/api/users";

const urls = {
    auth: {
        signIn: `${auth}/sign-in`,
        signUp: `${auth}/sign-up`,
        refresh: `${auth}/refresh`,
    },
    user:{
        me:`${users}/me`,
        getAll:`${users}`
    }
}

export {
    baseURL,
    urls
}