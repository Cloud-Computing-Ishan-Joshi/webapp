const express = require('express');
const bodyParser = require('body-parser');

const healthz = require('./healthz/routes/healthz');
const user_routes = require('./user/routes/user_routes');
const handle_body = require('./user/utils/handle_errors');

const db = require('./database/db');
const User = require('./user/model/user');

let syncrun = false;

const InitRun = async() => {
    try {
        await db.authenticate();
        await db.sync();
        await User.sync({ alter: true });
        syncrun = true;
    } catch (error) {
        console.log('Error: ', error);
    }
};

if (!syncrun) {
    InitRun();
}

// process.on('uncaughtException', (error, origin) => {
//     console.log('----- Uncaught exception -----')
//     console.log(error)
//     console.log('----- Exception origin -----')
//     console.log(origin)
// })

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('----- Unhandled Rejection at -----')
//     console.log(promise)
//     console.log('----- Reason -----')
//     console.log(reason)
// })

const app = express();

app.use(bodyParser.json({
    verify: handle_body
}));

app.use(healthz);

app.use('/v1/user', user_routes);

app.all('*', (req, res) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Invalid request');
    }
    res.set('Cache-Control', 'no-cache');
    return res.status(404).end();
});


module.exports = app;