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
        // check if the user already exists
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            if (user) {
                console.log('****************User already exists*****************');
                return res.status(400).end();
            }
        });
        // if (userExists) {
        //     log('****************User already exists*****************');
        //     return res.status(400).end();
        // }
        const user = await User.create(req.body);
        // const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        // res.set('Cache-Control', 'no-cache');
        // res.set('Authorization', `Bearer ${token}`);
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