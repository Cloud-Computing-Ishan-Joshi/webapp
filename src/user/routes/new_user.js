const express = require('express');
const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const User = require('../../user/model/user');
const db = require('../../database/db');
const validate_body = require('../middlewares/validate_body');
const sync = require('../middlewares/sync');
// const db = require('../../database/db');
const User = require('../model/user');

const router = express.Router();

// User.sync().then(() => {
//     if (process.env.NODE_ENV !== 'test') {
//         console.log('User model synchronized successfully for Auth middleware - New User Route');
//     }
// });

// router.use(validate_body);

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
        console.log(req.body);
        console.log("****************** Validation Result ************************");
        return res.status(400).end();
    }
    try {
        console.log('****************** Creating user ************************');
        // check if the user already exists
        try {
            const userExists = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (userExists) {
                return res.status(400).end();
            }
        } catch (err) {
            if (process.env.NODE_ENV !== 'test') {
                console.log('Error creating user');
                console.log(err);
            }
            return res.status(500).end();
        }
        const user = await User.create(req.body);
        res.set('cache-control', 'no-cache');
        return res.status(201).send(user);
    } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error creating user');
            console.log(err);
        }
        console.log("****************** Error creating user ************************");
        return res.status(500).end();
    }
});

module.exports = router;