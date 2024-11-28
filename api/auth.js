import connectDB from "../src_backend/configs/connectionDB";
import {getHandler} from "../src_backend/routes";
import {configs} from "../src_backend/configs/config";

export default async function handler(req, res) {

    const origin = req.headers.origin;
    console.log("auth.js",{origin, allowedOrigins:configs.ALLOWED_ORIGINS});
    if(configs.ALLOWED_ORIGINS.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else{
        res.setHeader('Access-Control-Allow-Origin', "");
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

