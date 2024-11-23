export const mainHandler = (...middlewares) => {
    return async (req, res) => {
        let params = {}

        for (const middleware of middlewares) {

            try {
                const result = await middleware(req, res, params);
                if (result) {
                    params = {...result};
                }
            } catch (error) {
                return res.status(error?.status || 500).json({
                    message: error?.message || 'Internal Server Error',
                    status: error?.status
                });
            }
        }
    };
};
