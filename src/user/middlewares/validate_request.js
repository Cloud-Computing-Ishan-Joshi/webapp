const { logger } = require('../../logging/logger');

const invalid_method = async(req, res, next) => {
    const allowedMethods = new Set(['POST']);
    const allowedMethods_self = new Set(['GET', 'POST', 'PUT']);
    // res.set('Cache-Control', 'no-cache');
    if (req.path === '/user/self' && !allowedMethods_self.has(req.method)) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid request method: ${req.method} Status: 405`
        });
        return res.status(405).end();
    }
    if (req.path === '/user' && !allowedMethods.has(req.method)) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid request method: ${req.method} Status: 405`
        });
        return res.status(405).end();
    } else {
        req.start = Date.now();
        next();
    }
}

module.exports = invalid_method;