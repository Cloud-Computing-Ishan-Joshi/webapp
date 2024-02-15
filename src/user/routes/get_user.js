// Coode to get user details
const express = require('express');
const auth = require('../middlewares/auth');
const validate_body = require('../middlewares/validate_body');
const User = require('../model/user');
const sync = require('../middlewares/sync');
const router = express.Router();

// router.use(auth);

router.get('/self', auth, validate_body, sync, async(req, res) => {
    res.set('cache-control', 'no-cache');
    try {
        const user = await User.findOne({
            where: {
                username: req.user.username
            }
        });
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(403).send();
        }
    } catch (err) {
        return res.status(500).send();
    }
});

module.exports = router;