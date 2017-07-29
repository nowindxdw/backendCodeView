 var FIELDS = require("../dictionary");
/**
 * @module Operators
 * @description  创建系统管理员表
 * @param sequelize  Sequelize对象
 * @returns {*|{}}
 */
module.exports = function(sequelize) {
    return sequelize.define('Operators', {
        /**
         *@see [operatorSfId](module-dictionary.html#.operatorSfId__anchor)
         */
        operatorSfId: FIELDS.operatorSfId,
        /**
         *@see [operatorUsername](module-dictionary.html#.operatorUsername__anchor)
         */
        operatorUsername: FIELDS.operatorUsername,
        /**
         *@see [operatorPassword](module-dictionary.html#.operatorPassword__anchor)
         */
        operatorPassword: FIELDS.operatorPassword,
        /**
         *@see [visible](module-dictionary.html#.visible__anchor)
         */
        visible: FIELDS.visible,
        /**
         *@see [opeatorAdmin](module-dictionary.html#.opeatorAdmin__anchor)
         */
        operatorAdmin: FIELDS.operatorAdmin,
        /**
         *@see [enabled](module-dictionary.html#.enabled__anchor)
         */
        enabled: FIELDS.enabled,
        /**
         *@see [operatorName](module-dictionary.html#.operatorName__anchor)
         */
        operatorName: FIELDS.operatorName,
        /**
         *@see [mobile](module-dictionary.html#.mobile__anchor)
         */
        mobile: FIELDS.mobile,
        /**
         *@see [email](module-dictionary.html#.email__anchor)
         */
        email: FIELDS.email,
        /**
         *@see [failCount](module-dictionary.html#.failCount__anchor)
         */
        failCount: FIELDS.failCount,
        /**
         *@see [operatorRoles](module-dictionary.html#.operatorRoles__anchor)
         */
        operatorRoles:FIELDS.operatorRoles
    });
};