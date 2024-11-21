import {handlerAuth} from "./handlers/auth.handler";

export const routes = {
    POST: {
        "/api/auth/sign-in": handlerAuth.signIn,
        "/api/auth/sign-up": handlerAuth.signUp,
    },
    GET: {
        "/api/auth/me": handlerAuth.getMe,
    },
    DELETE: {
        "/api/auth/me": handlerAuth.deleteMe,
    },
    PUT: {
        "/api/auth/me": handlerAuth.updateMe,
    },
};