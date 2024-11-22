import {handlerAuth} from "./handlers/auth.handler";
import {ApiError} from "./errors/api.error";
import {mainHandler} from "./handlers/main.handler";
import {handlerCORS} from "./handlers/cors.handler";
import connectDB from "./configs/connectionDB";


const routes = {
    POST: {
        "/api/auth/sign-in": mainHandler(handlerAuth.signIn),
        "/api/auth/sign-up": mainHandler(handlerAuth.signUp),
    },
    GET: {
        "/api/auth/me": mainHandler(handlerAuth.getMe),
    },
    DELETE: {
        "/api/auth/me": mainHandler(handlerAuth.deleteMe),
    },
    PUT: {
        "/api/auth/me": mainHandler(handlerAuth.updateMe),
    },
};

export const getHandler = (method, path) => {
    const methodRoutes = routes[method];
    if (methodRoutes) {
        const handler = methodRoutes[path];
        if (handler) {
            return handler;
        }
        throw new ApiError(`Invalid endpoint for ${method}`, 400);
    }

    throw new ApiError("Method not Allowed", 405);
}

