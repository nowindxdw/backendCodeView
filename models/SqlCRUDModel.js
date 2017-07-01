
'use strict';

const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger();
const db = require('./db');

module.exports = {
    //C
    insert: function (dbName, tableName, insertionData) {
        logger.trace('Enter into insert');
        let sql = db
            .withSchema(dbName)
            .insert(insertionData)
            .into(tableName);
        logger.trace(sql.toString());
        return sql
            .then((result) => {
                return result;
            });
    },
    //C
    upsert: function (dbName, tableName, insertionData, updateOnDuplicate) {
        logger.trace('Enter into upsert');

        let sql = db.withSchema(dbName).insert(insertionData).into(tableName).toString();

        if (updateOnDuplicate && _.isArray(updateOnDuplicate) && updateOnDuplicate.length > 0) {
            sql += ' ON DUPLICATE KEY UPDATE ';
            for (var i = 0; i < updateOnDuplicate.length - 1; i++) {
                sql += updateOnDuplicate[i] + '=VALUES(' + updateOnDuplicate[i] + '), ';
            }
            sql += updateOnDuplicate[updateOnDuplicate.length - 1] + '=VALUES(' + updateOnDuplicate[updateOnDuplicate.length - 1] + ')';
        }

        logger.trace(sql);
        return db
            .raw(sql)
            .then((result) => {
                return result;
            });
    },
    //R
    select: function (dbName, tableName, columns, where) {
        logger.trace('Enter into select');

        let sql = db
            .withSchema(dbName)
            .select(columns)
            .from(tableName)
            .whereRaw(where);

        logger.trace(sql.toString());
        return sql
            .then((result) => {
                return result;
            });
    },
    //U
    update: function (dbName, tableName, updatedData, where) {
        logger.trace('Enter into update');

        let sql = db(tableName)
            .withSchema(dbName)
            .whereRaw(where)
            .update(updatedData);

        logger.trace(sql.toString());
        return sql
            .then((result) => {
                return result;
            });
    },
    //D
    delete: function (dbName, tableName, where) {
        logger.trace('Enter into delete');

        let sql = db(tableName)
            .withSchema(dbName)
            .whereRaw(where)
            .del();

        logger.trace(sql.toString());
        return sql
            .then((result) => {
                return result;
            });
    }
};