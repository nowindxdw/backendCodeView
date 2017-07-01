'use strict';

var config = require('config');
var dbConfig = config.get('mysql');

var debugMode = dbConfig.debugMode;
var knex = require('knex');
module.exports = knex({
    client: 'mysql',
    connection: {
        host : dbConfig.host,
        user : dbConfig.user,
        password : dbConfig.password,
        supportBigNumbers: dbConfig.supportBigNumbers,
        bigNumberStrings: dbConfig.bigNumberStrings
    },
    pool: { min: dbConfig.minConnection, max: dbConfig.maxConnection },
    debug:debugMode
});