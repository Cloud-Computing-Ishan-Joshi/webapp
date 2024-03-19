// Coode to get user details
const express = require('express');
const db = require('../../database/db');
const auth = require('../middlewares/auth');
const validate_body = require('../middlewares/validate_body');

const {logger, setLabel} = require('../../logs/logger');

setLabel('GET USER');

const router = express.Router();


router.get('/self', auth, validate_body, async(req, res) => {
    logger.debug('GET /v1/user/self API path');
    res.set('cache-control', 'no-cache');
    try {
        const user = await db.models.User.findOne({
            where: {
                username: req.user.username
            }
        });
        if (user) {
            // log response time and success
            const end = Date.now();
            const elapsed = end - req.start;
            logger.log({
                level: 'info',
                message: 'GET /v1/user/self API path',
                meta: `Success, Response time: ${elapsed}ms`
            })
            return res.status(200).send(user);
        } else {
            return res.status(403).send();
        }
    } catch (err) {
        logger.log({
            level: 'error',
            message: 'GET /v1/user/self API path',
            meta: err
        })
        return res.status(500).send();
    }
});

module.exports = router;