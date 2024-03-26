const http = require('http');
const app = require('./app');

const config = require('./config');
const dotenv = require('dotenv');
const {logger, setLabel} = require('./logging/logger');

const {PubSub} = require('@google-cloud/pubsub');

dotenv.config();
setLabel('INDEX');

const start = async() => {
    if (!process.env.DB_NAME) {
        console.log('DB_NAME not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'DB_NAME not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_USER) {
        console.log('DB_USER not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'DB_USER not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_PASSWORD) {
        console.log('DB_PASSWORD not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'DB_PASSWORD not found'
        });
        process.exit(1);
    }
    if (!process.env.DB_HOST) {
        console.log('DB_HOST not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'DB_HOST not found'
        });
        process.exit(1);
    }
    if (!process.env.NODE_ENV) {
        console.log('NODE_ENV not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'NODE_ENV not found'
        });
        process.exit(1);
    }
    if (!process.env.PROJECT_ID) {
        console.log('PROJECT_ID not found');
        logger.log({
            level: 'debug',
            severity: 'DEBUG',
            message: 'Process exited with code 1',
            meta: 'PROJECT_ID not found'
        });
        process.exit(1);
    }
    if (process.env.PROJECT_ID){
        const pubSubClient = new PubSub({projectId: process.env.PROJECT_ID});
        console.log('PubSub connected');
        logger.log({
            level: 'info',
            severity: 'INFO',
            message: 'PubSub connected',
            meta: 'PubSub connected'
        });
        // global pubSubClient
        global.pubSubClient = pubSubClient;



    }
};

const server = http.createServer(app);

const PORT = process.env.NODE_ENV === 'production' ? config.port.production : config.port.dev;

server.listen(PORT, () => {
    // console.log(`App running on Port: ${PORT}.`)
    logger.log({
        level: 'info',
        severity: 'INFO',
        message: `App running`,
        meta: `Port: ${PORT}`  
    });
});

start();