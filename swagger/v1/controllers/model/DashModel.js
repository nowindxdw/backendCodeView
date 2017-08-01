"use strict";
/**
 *@module AuthModel.js登录认证相关功能实现
 *@description 登录认证相关功能实现
 *
 */
const Logger = require('logger-romens');
let logger = new Logger(__logConfig);
const sqlModel = require("../../../../models/SqlCRUDModel");
const RETCODE = require("../../../../models/retcode").RETCODE;
module.exports = function () {

    var model = {
        getDashData:(user,callback)=>{
            logger.trace("enter get DashData");
            callback(null,user)
        }
    };
    return model;
};

