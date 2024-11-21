export const handlerCORS = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить все источники
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Разрешенные методы
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Разрешенные заголовки

    if (req.method === 'OPTIONS') {
        // preflight-query
        res.status(200).end();
        return;
    }
}