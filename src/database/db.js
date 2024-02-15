const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let db_name = process.env.DB_NAME;

if (process.env.NODE_ENV === 'test') {
    db_name = process.env.DB_NAME_TEST;
}

const db = new sequelize(db_name, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'test' ? console.log : false,
});

module.exports = db;