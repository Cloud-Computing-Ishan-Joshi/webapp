const http = require('http');
const app = require('./app');
const db = require('./database/db');

const config = require('./config');

const dotenv = require('dotenv');
dotenv.config();


const start = async() => {
    if (!process.env.DB_NAME) {
        console.log('DB_NAME not found');
        process.exit(1);
    }
    if (!process.env.DB_USER) {
        console.log('DB_USER not found');
        process.exit(1);
    }
    if (!process.env.DB_PASSWORD) {
        console.log('DB_PASSWORD not found');
        process.exit(1);
    }
    if (!process.env.DB_HOST) {
        console.log('DB_HOST not found');
        process.exit(1);
    }
    if (!process.env.PORT) {
        console.log('PORT not found');
        process.exit(1);
    }
    if (!process.env.NODE_ENV) {
        console.log('NODE_ENV not found');
        process.exit(1);
    }
};

// try {
//     db.authenticate()
//         .then(() => {
//             console.log('Connection has been established successfully.');
//             db.sync({ alter: true }).then(() => {
//                 // if (process.env.NODE_ENV !== 'test') {
//                 console.log('Database synchronized successfully');
//                 // }
//             }).catch(err => {
//                 console.log('Error synchronizing database');
//             });
//         })
//         .then(() => {
//             console.log('Database & tables created!');
//         })
//         .catch(err => {
//             console.error('Unable to connect to the database:', err);
//         });
//     // console.log('Connected to database');
// } catch (err) {
//     console.log(`Database connection failed`);
// }

const server = http.createServer(app);

const PORT = process.env.NODE_ENV === 'production' ? config.port.production : config.port.dev;

server.listen(PORT, () => {
    console.log(`App running on Port: ${PORT}.`)
});

start();