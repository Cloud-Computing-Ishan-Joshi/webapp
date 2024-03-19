const { logger } = require('../../logging/logger');

const onlyJsonBody = (req, res, next) => {
    res.set('cache-control', 'no-cache');
    if (req.headers['content-type'] !== 'application/json') {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid content-type ${415}`
        });
        return res.status(415).end();
    } else {
        req.start = Date.now();
        next();
    }
}