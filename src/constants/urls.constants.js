const baseURL = process.env.REACT_APP_API_URL;
// const baseURL="https://test-three-sage-59.vercel.app"
const auth = "/auth";
const users = "/users";

const urls = {
    auth: {
        signIn: `${auth}/sign-in`,
        signUp: `${auth}/sign-up`,
        refresh: `${auth}/refresh`,
        signInWithGoogle:`${auth}/sign-in/google`,
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