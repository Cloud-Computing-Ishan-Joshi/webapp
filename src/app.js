const express = require('express');
const bodyParser = require('body-parser');

const healthz = require('./healthz/routes/healthz');
const user_routes = require('./user/routes/user_routes');
const handle_body = require('./user/utils/handle_errors');

// const User = require('./user/model/user');

// try {
//     User.sync({ alter: true }).then(() => {
//         if (process.env.NODE_ENV !== 'test') {
//             console.log('User model synchronized successfully for Auth middleware');
//         }
//     });
// } catch (error) {
//     console.log('Error synchronizing user model');
// }

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
    res.status(404).send();
});


module.exports = app;