const express = require('express');


const db = require('../../database/db');
const validate_body = require('../middlewares/validate_body');
const validate_method = require('../middlewares/validate_request');

const router = express.Router();
const {logger, setLabel} = require('../../logging/logger');

setLabel('HEALTHZ');

router.all('/healthz', validate_method, validate_body, async(req, res) => {
    logger.debug('GET /healthz API path');
    res.set('Cache-Control', 'no-cache');
    try {
        await db.authenticate();
        // log response time
        const end = Date.now();
        const elapsed = end - req.start;
        logger.log({
            level: 'info',
            message: 'GET /healthz API path',
            meta: `Success, Response time: ${elapsed}ms`
        });
        res.status(200).send();
    } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Database connection failed');
        }
        logger.log({
            level: 'error',
            message: 'GET /healthz API path',
            meta: err
        });
        // console.log(err);
        // loggers.error('Error: ', err);
        res.status(503).send();
    }
});


module.exports = router;