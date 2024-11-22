import {handlerCORS} from "../src_backend/handlers/cors.handler";
import connectDB from "../src_backend/configs/connectionDB";
import {getHandler} from "../src_backend/routes";

export default async function handler(req, res) {
    handlerCORS(req, res);
    connectDB().then();

    const fullUrl = req.url;
    const method = req.method;
    const path = new URL(fullUrl, `https://${req.headers.host}`).pathname;

    try {
        const handler = getHandler(method, path);
        await handler(req, res);
    } catch (error) {
        return res.status(error?.status || 500).json({message: error?.message, status: error?.status});
    }

}

