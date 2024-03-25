const User = require('../model/user');
const {logger} = require('../../logging/logger');
const basicAuth = require('basic-auth');

async function verifyUser(req, res, next) {
    res.set('cache-control', 'no-cache');
    const auth = basicAuth(req);
    if (!auth || !auth.name || !auth.pass) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `Invalid credentials ${401}`
        });
        return res.status(401).end();
    }
    
    const user = await User.findOne({
        where: {
            username: auth.name
        }
    });
    if (!user) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `User not found ${404}`
        });
        return res.status(404).end();
    }
    // verify if the user is verified
    if (user.verify == 'created') {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `User not verified ${403}`
        });
        return res.status(403).end();
    }
    if (user.verify == 'expired') {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: `User verification expired ${403}`
        });
        return res.status(403).end();
    }
    req.user = user;
    next();
}

module.exports = verifyUser;