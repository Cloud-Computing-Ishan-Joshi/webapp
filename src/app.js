const express = require('express');
const bodyParser = require('body-parser');

const healthz = require('./healthz/routes/healthz');
const user_routes = require('./user/routes/user_routes');
const handle_body = require('./user/utils/handle_errors');

const db = require('./database/db');
const User = require('./user/model/user');

const {logger, setLabel} = require('./logs/logger');

let syncrun = false;
setLabel('APP INIT');

const InitRun = async() => {
    try {
        await db.authenticate();
        await db.sync();
        await User.sync({ alter: true });
        syncrun = true;
    } catch (error) {
        logger.log({
            level: 'error',
            message: 'App: Database connection failed',
            meta: error
        });
    }
};

if (!syncrun) {
    InitRun();
}

process.on('uncaughtException', (error, origin) => {
    logger.debug('----- Uncaught exception -----')
    console.log(error);
    logger.log({
        level: 'warn',
        message: 'Uncaught exception',
        meta: error
    });
    logger.debug('----- Exception origin -----')
    logger.log({
        level: 'warn',
        message: 'Exception origin',
        meta: origin
    });
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.debug('----- Unhandled Rejection at -----')
    console.log(promise);
    logger.log({
        level: 'warn',
        message: 'Unhandled Rejection at',
        meta: promise
    });
    logger.debug('----- Reason -----')
    console.log(reason);
    logger.log({
        level: 'warn',
        message: 'Reason',
        meta: reason
    });
})

const app = express();

app.use(bodyParser.json({
    verify: handle_body
}));

app.use(healthz);

app.use('/v1/user', user_routes);

app.all('*', (req, res) => {
    logger.debug('* API path');
    if (process.env.NODE_ENV !== 'test') {
        console.log('Invalid request');
        logger.log({
            level: 'warn',
            message: `${req.method} ${req.originalUrl} API path`,
            meta: 'Invalid request'
        });
    }
    res.set('Cache-Control', 'no-cache');
    return res.status(404).end();
});


module.exports = app;