// Coode to get user details
const express = require('express');
const auth = require('../middlewares/auth');
const validate_body = require('../middlewares/validate_body');
const User = require('../model/user');
const sync = require('../middlewares/sync');
const router = express.Router();
const db = require('../../database/db');

// User.sync().then(() => {
//     if (process.env.NODE_ENV !== 'test') {
//         console.log('User model synchronized successfully for Auth middleware - Get User Details');
//     }
// });
// router.use(auth);

router.get('/self', auth, validate_body, async(req, res) => {
    res.set('cache-control', 'no-cache');
    console.log(req.body);
    try {
        const user = await User.findOne({
            where: {
                username: req.user.username
            }
        });
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(403).end();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).end();
    }
});

module.exports = router;