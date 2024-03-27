const express = require('express');
const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
const User = require('../../user/model/user');
const publish_message = require('../utils/publish_message');

const {logger, setLabel} = require('../../logging/logger');

setLabel('CREATE USER');

User.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        logger.log({
            level: 'info',
            severity: 'INFO',
            message: 'User model synchronized successfully'
        });
        // console.log('User model synchronized successfully');
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
    logger.debug('POST /v1/user API path');
    res.set('cache-control', 'no-cache');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: 'POST /v1/user API path',
            meta: `Invalid request 400, ${errors.array()} `
        });
        return res.status(400).end();
    }
    await User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            logger.log({
                level: 'warn',
                severity: 'WARNING',
                message: 'POST /v1/user API path',
                meta: `User already exists 400`
            });
            return res.status(400).end();
        }
    }).catch((err) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error finding user');
            logger.log({
                level: 'error',
                severity: 'ERROR',
                message: 'POST /v1/user API path',
                meta: err
            });
            console.log(err);
        }
        return res.status(500).end();
    });
    try {
        const user = await User.create(req.body);
        // access the global publisher object
        const data = {
            first_name: user.first_name,
            username: user.username,
            token: user.token 
        };
        if (process.env.NODE_ENV !== 'test') {

            const messageId = await publish_message(process.env.TOPIC_NAME, JSON.stringify(data));
            logger.log({
                level: 'info',
                severity: 'INFO',
                message: 'PubSub Message published',
                meta: `Message ${messageId} published`
            });
        }
        const end = Date.now();
        const elapsed = end - req.start;
        logger.log({
            level: 'info',
            severity: 'INFO',
            message: 'POST /v1/user API path',
            meta: `Success 201, Response time: ${elapsed}ms`
        });
        return res.status(201).send(user);
    } catch (err) {
        logger.log({
            level: 'error',
            severity: 'ERROR',
            message: 'POST /v1/user API path',
            meta: err
        });
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: `GET /v1/user/self/${req.params.token} API path`,
            meta: err
        });
        return res.status(500).end();
    }
});

module.exports = router;