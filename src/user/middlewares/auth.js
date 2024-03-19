const basicAuth = require('basic-auth');
const User = require('../model/user');
const {logger, setLabel} = require('../../logs/logger');

async function verifyAuth(req, res, next) {
    res.set('cache-control', 'no-cache');
    const auth = basicAuth(req);
    if (!auth || !auth.name || !auth.pass) {
        logger.log({
            level: 'error',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: 'Invalid credentials'
        });
        return res.status(401).end();
    }
    // check if the user exists and the password is correct using user.prototype.comparePassword in Sequelize postgresql Schema
    const user = await User.findOne({
        where: {
            username: auth.name
        }
    });

    if (!user || !await user.comparePassword(auth.pass)) {
        logger.log({
            level: 'error',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: 'Invalid credentials'
        });
        return res.status(403).end();
    }
    req.user = user;
    req.start = Date.now();
    next();
}

module.exports = verifyAuth;