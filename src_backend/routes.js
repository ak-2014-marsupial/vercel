import {ApiError} from "./errors/api.error";
import {mainHandler} from "./handlers/main.handler";
import {authController} from "./controllers/auth.controller";
import {commonMiddleware} from "./middlewares/common.middleware";
import {UserValidator} from "./validators/user.validator";
import {authMiddleware} from "./middlewares/auth.middleware";
import {userController} from "./controllers/user.controller";


const routes = {
    POST: {
        "/api/auth/sign-in": mainHandler(commonMiddleware.isBodyValid( UserValidator.login), authController.signIn),
        "/api/auth/sign-up": mainHandler(commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp),
        "/api/auth/refresh": mainHandler(authMiddleware.checkRefreshToken, authController.refresh),
    },
    GET: {
        "/api/auth/me": mainHandler(authMiddleware.checkAccessToken, userController.getMe),
        "/api/auth/users": mainHandler(userController.getAll),
        "/api/auth/google": mainHandler(userController.googleSignIn),
        "/api/auth/google/callback": mainHandler(userController.googleCallBack),
        "/api/auth/:userId": userController.getById,
    },
    DELETE: {
        "/api/auth/me": mainHandler(authMiddleware.checkAccessToken, userController.deleteMe),
    },
    PUT: {
        "/api/auth/me": mainHandler(authMiddleware.checkAccessToken, userController.updateMe),
    },
};

export const getHandler = (method, path) => {
    const methodRoutes = routes[method];
    if (methodRoutes) {
        const handler = methodRoutes[path];
        if (handler) {
            return handler;
        }
        // Check for dynamic routes
        for (const route in methodRoutes) {
            const dynamicRouteRegex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
            const match = path.match(dynamicRouteRegex);
            // console.log("routes: ", {path,route,match});
            if (match) {
                const originalHandler = methodRoutes[route]

                // If a match is found, you can extract parameters if needed
                const params = {};
                const paramNames = route.match(/:(\w+)/g);
                if (paramNames) {
                    paramNames.forEach((param, index) => {
                        params[param.substring(1)] = match[index + 1]; // Extract parameter value
                    });
                }
                return (req, res) => originalHandler(req, res, params)
                // return { handler: methodRoutes[route], params }; // Return handler and extracted params
            }

        }
        throw new ApiError(`Invalid endpoint for ${method}`, 400);

    }
    throw new ApiError("Method not Allowed", 405);

}