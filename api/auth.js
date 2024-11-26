import {handlerCORS} from "../src_backend/handlers/cors.handler";
import connectDB from "../src_backend/configs/connectionDB";
import {getHandler} from "../src_backend/routes";

export default async function handler(req, res) {
    // handlerCORS(req, res);

    res.setHeader('Access-Control-Allow-Origin',  'http://localhost:3000'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Respond to preflight requests
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

