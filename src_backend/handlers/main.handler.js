export const mainHandler = (...middlewares) => {
    return async (req, res) => {
        for (const middleware of middlewares) {
            try {
                await middleware(req, res);
            } catch (error) {
                return res.status(error?.status || 500).json({ message: error?.message || 'Internal Server Error', status: error?.status });
            }
        }
    };
};
