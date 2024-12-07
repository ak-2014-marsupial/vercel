import connectDB from "../src_backend/configs/connectionDB";
import {getHandler} from "../src_backend/routes";
import {populateDB} from "../src_backend/configs/populateDB";

export default async function handler(req, res) {

    const origin = req.headers.origin;
    const allowedOrigins = process.env?.ALLOWED_ORIGINS?.split(",") || []
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', "");
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.setHeader("Content-Security-Policy", "default-src 'self';" +
    //     " script-src 'self' https://accounts.google.com https://apis.google.com;" +
    //     " style-src 'self' 'unsafe-inline'; connect-src 'self' https://www.googleapis.com;");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        // console.log('CORS preflight response sent with status 200');
        return;
    }



    const fullUrl = req.url;
    const method = req.method;
    const path = new URL(fullUrl, `https://${req.headers.host}`).pathname;

    try {
        await connectDB();
        await populateDB();

        const handler = getHandler(method, path);
        await handler(req, res);
    } catch (error) {
        console.log("auth.js:", error);
        return res.status(error?.status || 500).json({message: error?.message, status: error?.status});
    }

}

