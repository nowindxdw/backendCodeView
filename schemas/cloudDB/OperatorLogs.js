 var FIELDS = require("../dictionary");
/**
 * @module OperatorLogs
 * @description  创建系统日志表
 * @param sequelize  Sequelize对象
 * @returns {*|{}}
 */
module.exports = function(sequelize) {
    return sequelize.define('OperatorLogs', {
        /**
         *@see [operatorSfId](module-dictionary.html#.operatorSfId__anchor)
         */
        operatorSfId: FIELDS.operatorSfId,
        /**
         *@see [ipAddr](module-dictionary.html#.ipAddr__anchor)
         */
        ipAddr: FIELDS.ipAddr,
        /**
         *@see [action](module-dictionary.html#.action__anchor)
         */
        action: FIELDS.action,
        /**
         *@see [logResult](module-dictionary.html#.logResult__anchor)
         */
        logResult: FIELDS.logResult,
        /**
         *@see [logText](module-dictionary.html#.logText__anchor)
         */
        logText:FIELDS.logText
    });
};