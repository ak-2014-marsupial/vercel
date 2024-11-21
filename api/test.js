export default function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить все источники
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Разрешенные методы
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Разрешенные заголовки

    if (req.method === 'OPTIONS') {
        // preflight-query
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        res.status(200).json(`Hello World ${Date.now()}`);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Метод ${req.method} не разрешен`);
    }
}