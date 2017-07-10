"use strict";
/**
 *@module AuthModel.js登录认证相关功能实现
 *@description 登录认证相关功能实现
 *
 */
const jwt = require('jsonwebtoken');
const Logger = require('logger-romens');
let logger = new Logger();
const sqlModel = require("../../../../models/SqlCRUDModel");
const RETCODE = require("../../../../models/retcode").RETCODE;
const crypto = require("../../../../models/crypto")();
module.exports = function () {

    var authModel = {
        adminLoginAuth: (loginData)=>{
            logger.trace("enter adminLoginAuth loginData",loginData);
            let username = loginData.username;
            let password = loginData.password;
            let operatorPassword = crypto.encodeLoginPwd(password);
            let dbName = __dbConfig.cloudDB;
            var tableName = "Operators";
            var columns =  ['operatorSfId'];
            var whereStr = "`operatorUsername`='"+username
                +"' and `operatorPassword`='"+ operatorPassword+"'";
            return sqlModel.select(dbName,tableName,columns,whereStr)
                .then(results=>{
                    if(results.length>0){
                        var result = results[0];
                        logger.trace(result);
                        // 用户验证渠道  平台：cloud
                        var data = jwtProducer(username, "cloud", __dbConfig.cloudDB, result.operatorSfId);
                        return data;
                    }else{
                        logger.info("没有查询到对应用户名和密码");
                        return Promise.resolve(RETCODE.UNAUTHORIZED);
                    }
                })
                .catch(err=>{
                    logger.error(err.stack);
                    return Promise.reject(RETCODE.INTER_ERR);
                })
        },

        /**
         * @func deleteAuth
         * @description 登出清除token
         * @param userId
         * @param callback
         */
        deleteAuth :(userId)=>{
            let CacheServerFactory = require('cache-server-factory-romens');
            let RedisConnectionFactory = require('redis-connection-factory-romens');
            let redisConn = RedisConnectionFactory.getRedisConnection(__redisConfig);
            let cacheServer = CacheServerFactory.getCacheServer(__redisConfig.prefix, redisConn);
            return new Promise((resolve,reject)=>{
                cacheServer.find(userId.toString(), function (error, result) {
                    if (error) {
                        logger.error(error);
                        return reject(error);
                    }
                    if (result !== null) {
                        cacheServer.remove(userId.toString(),function(err){
                            return resolve();
                        });
                    }else{
                        logger.warn("服务端没有登录信息，无法完成登出");
                        return reject(RETCODE.INTER_ERR);
                    }
                });
            })
        }
    };
    /**
     * @func jwtProducer
     * @description jwt的统一生成方法
     * @param username
     * @param roleType
     * @param dbName
     * @param userId
     * @returns {{username: *, token: *}}
     */
    function jwtProducer(username,roleType,dbName,userId){
        // jwt id
        var jti = (Math.random() * 100000000000000000).toString();
        // jwt 签发者
        var iss = __authConfig.issuer;

        // 签发时间
        var iat = Date.now() / 1000;

        // 失效时间
        var exp = iat + __authConfig.expire;

        // 使用用户id  平台:cloud.Operator.operatorSfId 客户: customer.customerOperatorSfId,yy365平台：customerSfId
        var sub = userId;

        // 用户验证渠道  平台：cloud  客户：customer  医药365平台：yy365
        var role = roleType;

        // 用户数据库名
        var location = dbName;

        var payload = {
            jti: jti,
            iss: iss,
            iat: iat,
            exp: exp,
            sub: sub,
            role: role,
            location: location
        };
        var token = jwt.sign(payload, __authConfig.secret);
        return {
            operatorUsername: username,
            token: token
        };
    }
    return authModel;
};

