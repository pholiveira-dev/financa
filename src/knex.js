const knex = require('knex');
const knexfile = require('../knexfile');

const enviroment = process.env.NODE_ENV || 'development';
const db = knex(knexfile[enviroment]);

module.exports = db;