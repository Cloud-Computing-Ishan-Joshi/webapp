const express = require('express');


const db = require('../../database/db');
const validate_body = require('../middlewares/validate_body');
const validate_method = require('../middlewares/validate_request');

const router = express.Router();


router.all('/healthz', validate_method, validate_body, async(req, res) => {
    res.set('Cache-Control', 'no-cache');
    try {
        await db.authenticate();
        res.status(200).send();
    } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Database connection failed');
        }
        // console.log(err);
        res.status(503).send();
    }
});


module.exports = router;