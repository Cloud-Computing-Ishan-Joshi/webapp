const http = require('http');
const app = require('./app');

const config = require('./config');

const dotenv = require('dotenv');
const {logger, setLabel} = require('./logging/logger');
dotenv.config();

setLabel('INDEX');

const start = async() => {
    if (!process.env.DB_NAME) {
        console.log('DB_NAME not found');
        logger.log({
            level: 'error',
            message: 'Process exited with code 1',
            meta: 'DB_NAME not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_USER) {
        console.log('DB_USER not found');
        logger.log({
            level: 'error',
            message: 'Process exited with code 1',
            meta: 'DB_USER not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_PASSWORD) {
        console.log('DB_PASSWORD not found');
        logger.log({
            level: 'error',
            message: 'Process exited with code 1',
            meta: 'DB_PASSWORD not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_HOST) {
        console.log('DB_HOST not found');
        logger.log({
            level: 'error',
            message: 'Process exited with code 1',
            meta: 'DB_HOST not found'
        });
        process.exit(1);
    }
    if (!process.env.NODE_ENV) {
        console.log('NODE_ENV not found');
        logger.log({
            level: 'error',
            message: 'Process exited with code 1',
            meta: 'NODE_ENV not found'
        });
        process.exit(1);
    }
};

const server = http.createServer(app);

const PORT = process.env.NODE_ENV === 'production' ? config.port.production : config.port.dev;

server.listen(PORT, () => {
    // console.log(`App running on Port: ${PORT}.`)
    logger.log({
        level: 'info',
        message: `App running`,
        meta: `Port: ${PORT}`  
    });
});

start();