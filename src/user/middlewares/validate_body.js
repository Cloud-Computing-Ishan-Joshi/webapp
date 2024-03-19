const { logger } = require('../../logging/logger');

const request_body = async(req, res, next) => {
    // res.set('cache-control', 'no-cache');
    const allowedMethodsBody = new Set(['POST', 'PUT']);

    if ((!Object.keys(req.body).length || Object.keys(req.query).length) && allowedMethodsBody.has(req.method)) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid request body 400`
        });
        return res.status(400).end();
    }

    if (Object.keys(req.body).length && !allowedMethodsBody.has(req.method)) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid request body 400`
        });
        return res.status(400).end();
    }

    const allowedParams = new Set(['username', 'password', 'first_name', 'last_name']);
    const extraParams = Object.keys(req.body).filter(param => !allowedParams.has(param));

    if (extraParams.length > 0 && allowedMethodsBody.has(req.method)) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid request body 400`
        });
        return res.status(400).end();
    }
    req.start = Date.now();
    next();
};


module.exports = request_body;