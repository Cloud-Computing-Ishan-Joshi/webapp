const express = require('express');
const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
const User = require('../../user/model/user');

User.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('User model synchronized successfully');
    }
});
const validate_body = require('../middlewares/validate_body');

const router = express.Router();


const validate = [
    check('first_name').exists().isString(),
    check('last_name').exists().isString(),
    check('password').exists().isLength({ min: 6 }),
    check('username').isEmail().withMessage('Email format is invalid'),
];

router.post('/', validate_body, validate, async(req, res) => {
    res.set('cache-control', 'no-cache');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).end();
    }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            return res.status(400).end();
        }
    }).catch((err) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error finding user');
            console.log(err);
        }
        return res.status(500).end();
    });
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).end();
    }
});

module.exports = router;