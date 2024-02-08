// update user
const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../../database/db');
const validate_body = require('../middlewares/validate_body');
const validate_method = require('../middlewares/validate_request');
const auth = require('../middlewares/auth');

const router = express.Router();

const validate = [
    check('first_name').optional({ checkFalsy: true }).isString(),
    check('last_name').optional({ checkFalsy: true }).isString(),
    check('password').optional({ checkFalsy: true }).isLength({ min: 6 }),
    check('username').optional({ checkFalsy: true }).isEmail()
];

router.put('/self', validate_method, validate_body, auth, validate, async(req, res) => {
    res.set('cache-control', 'no-cache');
    const errors = validationResult(req);
    if (!errors.isEmpty() || req.body.username) {
        return res.status(400).send();
    }
    try {
        const user = await db.models.User.findOne({
            where: {
                username: req.user.username
            }
        });
        if (user) {
            await user.update(req.body);
            res.status(204).send();
        } else {
            res.status(403).send();
        }
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;