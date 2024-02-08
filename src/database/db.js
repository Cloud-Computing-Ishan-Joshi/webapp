const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});

module.exports = db;