const basicAuth = require('basic-auth');
const User = require('../model/user');

async function verifyAuth(req, res, next) {
    res.set('cache-control', 'no-cache');
    const auth = basicAuth(req);
    if (!auth || !auth.name || !auth.pass) {
        return res.status(401).end();
    }
    // check if the user exists and the password is correct using user.prototype.comparePassword in Sequelize postgresql Schema
    const user = await User.findOne({
        where: {
            username: auth.name
        }
    });

    if (!user || !await user.comparePassword(auth.pass)) {
        return res.status(403).end();
    }
    req.user = user;
    next();
}

module.exports = verifyAuth;