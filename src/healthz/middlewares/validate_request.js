const { logger } = require('../../logging/logger');

const invalid_method = async(req, res, next) => {
    if (req.method !== 'GET') {
        res.set('Cache-Control', 'no-cache');
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: 'GET /healthz API path',
            meta: `Invalid request method: ${req.method} Status: 405`
        });
        res.status(405).send();
    } else {
        req.start = Date.now();
        next();
    }
}

module.exports = invalid_method;