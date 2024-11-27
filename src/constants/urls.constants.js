const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL="https://test-three-sage-59.vercel.app"
const auth = "/api/auth";
const users = "/api/users";

const urls = {
    auth: {
        signIn: `${auth}/sign-in`,
        signUp: `${auth}/sign-up`,
        refresh: `${auth}/refresh`,
        me:`${auth}/me`
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