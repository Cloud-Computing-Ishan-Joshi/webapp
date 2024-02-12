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
        return res.status(400).send();
    }
    try {
        // check if the user already exists
        const userExists = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (userExists) {
            return res.status(400).send();
        }
        const user = await User.create(req.body);
        // const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.set('Cache-Control', 'no-cache');
        // res.set('Authorization', `Bearer ${token}`);
        res.status(201).send(user);
    } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error creating user');
            console.log(err);
        }
        res.status(400).send();
    }
});

module.exports = router;