// Code to verify user token
const express = require('express');
const User = require('../model/user');
const auth = require('../middlewares/auth');
const validate_body = require('../middlewares/validate_body');

const {logger, setLabel} = require('../../logging/logger');
const { log } = require('winston');

setLabel('VERIFY USER');

const router = express.Router();


router.get('/self/:token', async(req, res) => {
    logger.debug(`GET /v1/user/self/${req.params.token} API path`);
    res.set('cache-control', 'no-cache');
    try {
        const user = await User.findOne({
            where: {
                token: req.params.token
            }
        });
        if (user) {
            // log response time and success
            const end = Date.now();
            const elapsed = end - req.start;
            // verify expiration
            if (user.verify === 'verified') {
                logger.log({
                    level: 'info',
                    severity: 'INFO',
                    message: `GET /v1/user/self/${req.params.token} API path`,
                    meta: `User already verified ${400}, Response time: ${elapsed}ms`
                })
                return res.status(400).end();
            }
            let verified;
            if (user.verify === 'created') {
                verified = await user.verifyUser();
            }
            console.log(verified);
            if (verified === 'verified') {
                logger.log({
                    level: 'info',
                    severity: 'INFO',
                    message: `GET /v1/user/self/${req.params.token} API path`,
                    meta: `Success ${200}, Response time: ${elapsed}ms`
                })
                return res.status(200).end();
            } else {
                logger.log({
                    level: 'warn',
                    severity: 'WARNING',
                    message: `GET /v1/user/self/${req.params.token} API path`,
                    meta: `User verification expired ${403}`
                });
                return res.status(403).end();
            }
            
        } else {
            logger.log({
                level: 'warn',
                severity: 'WARNING',
                message: `GET /v1/user/self/${req.params.token} API path`,
                meta: `Invalid request 404`
            });
            return res.status(404).end();
        }
    } catch (err) {
        logger.log({
            level: 'error',
            severity: 'ERROR',
            message: `GET /v1/user/self/${req.params.token} API path`,
            meta: err
        })
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: `GET /v1/user/self/${req.params.token} API path`,
            meta: err
        })
        return res.status(500).end();
    }
});

module.exports = router;