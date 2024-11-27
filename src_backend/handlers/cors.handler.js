export const handlerCORS = (req, res) => {
    const origin = req.headers.origin;
    const allowedOrigins = process.env?.ALLOWED_ORIGINS?.split(",") || [];

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

}

