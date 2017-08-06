 var FIELDS = require("../dictionary");
/**
 * @module OperatorLogs
 * @description  创建系统日志表
 * @param sequelize  Sequelize对象
 * @returns {*|{}}
 */
module.exports = function(sequelize) {
    return sequelize.define('Messages', {
        /**
         *@see [msgSfId](module-dictionary.html#.msgSfId__anchor)
         */
        msgSfId: FIELDS.msgSfId,
        /**
         *@see [msgType](module-dictionary.html#.msgType__anchor)
         */
        msgType: FIELDS.msgType,
        /**
         *@see [msgContent](module-dictionary.html#.msgContent__anchor)
         */
        msgContent: FIELDS.msgContent,
        /**
         *@see [msgFrom](module-dictionary.html#.msgFrom__anchor)
         */
        msgFrom: FIELDS.msgFrom
    });
};