"use strict";
/**
 *@module AuthModel.js登录认证相关功能实现
 *@description 登录认证相关功能实现
 *
 */
const Logger = require('logger-romens');
let logger = new Logger(__logConfig);
const emailModel = require('../../../../models/email');
module.exports = function () {

    var model = {

        sendEmail: (name,email,message)=>{
            logger.trace("enter sendEmail to",email);
            logger.trace("send msg="+message);
            let mailConfig = {
                subject : "A concat message from "+name,
                content : "This msg from concact box: "+message,
                sendTo : "nowindxdw@126.com",
                operatorName : "dawei"
            };
            return new Promise((resolve,reject)=>{
                emailModel.sendEmail(mailConfig,function(err,result){
                    if(err){
                        return reject(err);
                    }else{
                        return resolve(result)
                    }
                })
            })
        }
    };

    return model;
};

