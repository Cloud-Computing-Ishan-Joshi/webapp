// update user
const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../../database/db');
const validate_body = require('../middlewares/validate_body');
const validate_method = require('../middlewares/validate_request');
const auth = require('../middlewares/auth');

const User = require('../model/user');

const {logger, setLabel} = require('../../logging/logger');

setLabel('UPDATE USER');

const router = express.Router();

const validate = [
    check('first_name').optional({ checkFalsy: true }).isString(),
    check('last_name').optional({ checkFalsy: true }).isString(),
    check('password').optional({ checkFalsy: true }).isLength({ min: 6 }),
    check('username').optional({ checkFalsy: true }).isEmail()
];

router.put('/self', validate_method, validate_body, auth, validate, async(req, res) => {
    logger.debug('PUT /v1/user/self API path');
    res.set('cache-control', 'no-cache');
    const errors = validationResult(req);
    if (!errors.isEmpty() || req.body.username) {
        logger.log({
            level: 'warn',
            severity: 'WARNING',
            message: 'PUT /v1/user/self API path',
            meta: `Invalid request 400, ${errors.array()} `
        });
        return res.status(400).send();
    }
    await User.findOne({
        where: {
            username: req.user.username
        }
    }).then((user) => {
        if (!user) {
            logger.log({
                level: 'warn',
                severity: 'WARNING',
                message: 'PUT /v1/user/self API path',
                meta: `User not found 403`
            });
            return res.status(403).end();
        }
        user.update(req.body).then((user) => {
            // log response time and success
            const end = Date.now();
            const elapsed = end - req.start;
            logger.log({
                level: 'info',
                severity: 'INFO',
                message: 'PUT /v1/user/self API path',
                meta: `Success 204, Response time: ${elapsed}ms`
            });
            return res.status(204).end();
        }).catch((err) => {
            logger.log({
                level: 'error',
                severity: 'ERROR',
                message: 'PUT /v1/user/self API path',
                meta: err
            });
            return res.status(500).end();
        });

    }).catch((err) => {
        logger.log({
            level: 'error',
            severity: 'ERROR',
            message: 'PUT /v1/user/self API path',
            meta: err
        });
        return res.status(500).end();
    });
});

module.exports = router;