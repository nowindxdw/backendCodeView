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
const MESSAGES = "Messages";
const dbName = __dbConfig.cloudDB;
const snowflakeId = require('snowflakeid-romens').getSnowflakeIDFactory(function(){});
module.exports = function () {

    var model = {
        /**
         * 记录消息
         * @param msgFrom
         * @param msgType
         * @param msgContent
         * @returns {*}
         */
        saveMessage: (msgFrom,msgType,msgContent)=>{
            logger.trace("enter saveMessage ");
            let insertData = {
                msgSfId:snowflakeId.next().toString(),
                msgFrom:msgFrom,
                msgType:msgType,
                msgContent: msgContent,
                createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt:moment().format("YYYY-MM-DD HH:mm:ss")
            };
            return sqlModel.insert(dbName,MESSAGES,insertData)
                .then(result=>{
                    logger.info("save msg info success:"+insertData.logSfId);
                })
                .catch(error=>{
                    logger.warn("save msg info failed" + JSON.stringify(insertData)+"errstack:"+error.stack);
                })
        }
    };

    return model;
};

