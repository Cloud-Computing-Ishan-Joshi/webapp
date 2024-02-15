const User = require('../model/user');

async function syncUserMiddleware(req, res, next) {

    try {
        await User.sync({ alter: true }).then(() => {
            if (process.env.NODE_ENV !== 'test') {
                console.log('User model synchronized successfully for Auth middleware');
            }
        });
    } catch (error) {
        console.log('Error synchronizing user model');
        res.set('cache-control', 'no-cache');
        return res.status(500).end();
    }

    next();
}

module.exports = syncUserMiddleware;