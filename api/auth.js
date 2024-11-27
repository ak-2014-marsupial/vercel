import connectDB from "../src_backend/configs/connectionDB";
import {getHandler} from "../src_backend/routes";
import {handlerCORS} from "../src_backend/handlers/cors.handler";

export default async function handler(req, res) {
    handlerCORS(req, res);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        // console.log('CORS preflight response sent with status 200');
        return;
    }

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

