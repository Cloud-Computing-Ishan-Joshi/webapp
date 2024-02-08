// Coode to get user details
const express = require('express');
const db = require('../../database/db');
const auth = require('../middlewares/auth');
const validate_body = require('../middlewares/validate_body');

const router = express.Router();

// router.use(auth);

router.get('/self', auth, validate_body, async(req, res) => {
    res.set('cache-control', 'no-cache');
    try {
        const user = await db.models.User.findOne({
            where: {
                username: req.user.username
            }
        });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(403).send();
        }
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;