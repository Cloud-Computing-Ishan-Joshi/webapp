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
        await User.sync();
        syncrun = true;
    } catch (error) {
        console.log('Error: ', error);
    }
};

if (!syncrun) {
    InitRun();
}


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