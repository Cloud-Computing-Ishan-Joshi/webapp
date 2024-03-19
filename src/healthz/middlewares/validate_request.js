const { logger } = require('../../logs/logger');

const invalid_method = async(req, res, next) => {
    if (req.method !== 'GET') {
        res.set('Cache-Control', 'no-cache');
        logger.log({
            level: 'error',
            message: 'GET /healthz API path',
            meta: 'Invalid request method'
        });
        res.status(405).send();
    } else {
        req.start = Date.now();
        next();
    }
}

module.exports = invalid_method;