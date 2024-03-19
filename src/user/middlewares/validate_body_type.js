const { logger } = require('../../logs/logger');

const onlyJsonBody = (req, res, next) => {
    res.set('cache-control', 'no-cache');
    if (req.headers['content-type'] !== 'application/json') {
        logger.log({
            level: 'error',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: 'Invalid request body'
        });
        return res.status(415).end();
    } else {
        req.start = Date.now();
        next();
    }
}