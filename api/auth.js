import {handlerCORS} from "../src_backend/handlers/cors.handler";
import connectDB from "../src_backend/configs/connectionDB";
import {routes} from "../src_backend/routes";

export default async function handler(req, res) {
    // CORS
    handlerCORS(req, res);
    connectDB().then();


    const fullUrl = req.url;
    const method = req.method;
    const path = new URL(fullUrl, `https://${req.headers.host}`).pathname;
    console.log("auth.js", {path, method});

    const methodRoutes = routes[method];

    if (methodRoutes) {
        const handler = methodRoutes[path];
        if (handler) {
            try {
                await handler(req, res);
            } catch (error) {
                console.error("Error handling request:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            return;
        }
        return res.status(400).json({ message: `Invalid endpoint for ${method}` });
    }

    return res.status(405).json({ message: "Method not Allowed" });

}

