"use strict";
/**
 *@module AuthModel.js登录认证相关功能实现
 *@description 登录认证相关功能实现
 *
 */
const Logger = require('logger-romens');
let logger = new Logger(__logConfig);
const moment = require("moment");
const sqlModel = require('../../../../models/SqlCRUDModel');
const OPERATORLOG = "OperatorLogs";
const dbName = __dbConfig.cloudDB;
const snowflakeId = require('snowflakeid-romens').getSnowflakeIDFactory(function(){});
module.exports = function () {

    var model = {
        /**
         * 记录日志
         * @param operatorId
         * @param ip
         * @param action
         * @param result
         * @param remark
         * @returns {*}
         */
        saveOperatorLog: (operatorId,ip,action,result,remark)=>{
            logger.trace("enter saveOperatorLog ");
            let insertData = {
                logSfId:snowflakeId.next().toString(),
                operatorId:operatorId,
                ipAddr :ip,
                action:action,
                logResult: result,
                logText: remark,
                createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt:moment().format("YYYY-MM-DD HH:mm:ss")
            };
            return sqlModel.insert(dbName,OPERATORLOG,insertData)
                .then(result=>{
                    logger.info("save log info success:"+insertData.logSfId);
                })
                .catch(error=>{
                    logger.warn("save log info failed" + JSON.stringify(insertData)+"errstack:"+error.stack);
                })
        }
    };

    return model;
};

