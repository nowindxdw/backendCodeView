
/**
 *@module AuthModel.js登录认证相关功能实现
 *@description 登录认证相关功能实现
 *
 */
var _ = require('lodash');
var async = require('async');
var jwt = require('jsonwebtoken');

var Logger = require('logger-romens');
var logger = new Logger();
var DBSingleton = require("db-singleton");
var sqlModel = require("./../../../../models/SqlCRUDModel");
module.exports = function () {

    var authModel = {
        /**
         * @func yy365LoginAuth
         * @description yy365账号登录验证
         * @param loginData
         * @param callback
         */
        // yy365LoginAuth: function(loginData,callback){
        //     logger.trace("enter yy365LoginAuth");
        //     var username = loginData.username;
        //     var password = loginData.password;
        //     var yy365Data = {};
        //     var _this = this;
        //     yy365oAuthLogin.login(username, password, function (err, data) {
        //         if (err || _.isUndefined(data)) {
        //             logger.warn('yy365 登录网络异常.');
        //             return callback(null,"NEXT");
        //         }
        //         if (_.includes(data, '!ERROR!')) {
        //             logger.warn('用户名与密码不符, username: ' + username);
        //             return callback(null,"403");
        //         }
        //         try {
        //             yy365Data = JSON.parse(data);
        //         }
        //         catch (err) {
        //             return callback(null,"NEXT");
        //         }
        //         logger.debug('yy365Data: ' + JSON.stringify(yy365Data));
        //         if( yy365Data
        //             && (yy365Data.UserIdentityInfo)
        //             && _.isArray(yy365Data.UserIdentityInfo)
        //             && !_.isNull(yy365Data.UserIdentityInfo[0].EntCode)
        //         ){
        //             var customerOrgNo = yy365Data.UserIdentityInfo[0].EntCode;
        //         }else{
        //             logger.warn("该企业注册的EntCode有误,无法验证身份");
        //             return callback(null,"NEXT");
        //         }
        //
        //         var dbName = __dbConfig.cloudDB;
        //         var tableName = "Customers";
        //         var columns =  ['dbSuffixName', 'customerSfId'];
        //         var whereStr = "customerOrgNo="+customerOrgNo;
        //         return sqlModel.select(dbName,tableName,columns,whereStr)
        //             .then(function(results){
        //                 logger.debug(results);
        //                 if(results.length>0){
        //                     var result = results[0];
        //                     logger.trace(result);
        //                     //生成企业的数据库名
        //                     var customerDBName = __dbConfig.customerDBPrefix+"_"+result.dbSuffixName;
        //                     //通过sequelize实例化对应的数据库 如果没有则会自动创建
        //                     var customerDB = DBSingleton(__dbConfig, __base+"/schemas/customerDB","customerDB_schema");
        //                     customerDB.sequelize(customerDBName);
        //                     // 用户验证渠道  平台：cloud  客户：customer  医药365平台：yy365
        //                     var data =_this.jwtProducer(username,"yy365",customerDBName,result.customerSfId);
        //                     callback(null,data);
        //                 }else{
        //                     callback(null,"NEXT");
        //                 }
        //             });
        //     })
        // },
        //
        // /**
        //  * @func adminLoginAuth
        //  * @description 管理员账号登录验证
        //  * @param loginData
        //  * @param callback
        //  */
        // adminLoginAuth: function(loginData, callback){
        //     logger.trace("enter adminLoginAuth");
        //     var _this = this;
        //     var username = loginData.username;
        //     var password = loginData.password;
        //     //todo password 加密存储再数据库encode;
        //     var operatorPassword = password;
        //     var dbName = __dbConfig.cloudDB;
        //     var tableName = "Operators";
        //     var columns =  ['operatorSfId'];
        //     var whereStr = "operatorUsername="+username
        //                   +"and operatorPassword="+ operatorPassword;
        //     return sqlModel.select(dbName,tableName,columns,whereStr)
        //         .then(function(results) {
        //             if(results.length>0){
        //                 var result = results[0];
        //                 logger.trace(result);
        //                 // 用户验证渠道  平台：cloud  客户：customer  医药365平台：yy365
        //                 var data = _this.jwtProducer(username, "cloud", __dbConfig.cloudDB, result.operatorSfId);
        //                 callback(null, data);
        //
        //             }else{
        //                 callback(null, "NEXT");
        //             }
        //         })
        // },
        // /**
        //  * @func customerLoginAuth
        //  * @description 客户子账号登录验证
        //  * @param loginData
        //  * @param callback
        //  */
        // customerLoginAuth :function(loginData, callback){
        //     logger.trace("enter customerLoginAuth");
        //     var username = loginData.username;
        //     var password = loginData.password;
        //     logger.warn("customerLoginAuth is building.....");
        //     callback(null, '403');
        // },
        /**
         * @func jwtProducer
         * @description jwt的统一生成方法
         * @param username
         * @param roleType
         * @param dbName
         * @param userId
         * @returns {{username: *, token: *}}
         */
        jwtProducer:function(username,roleType,dbName,userId){
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
        },
        /**
         * @func deleteAuth
         * @description 登出清除token
         * @param userId
         * @param callback
         */
        deleteAuth :function(userId,callback){
            var CacheServerFactory = require('cache-server-factory-romens');
            var RedisConnectionFactory = require('redis-connection-factory-romens');
            var redisConn = RedisConnectionFactory.getRedisConnection(__redisConfig);
            var cacheServer = CacheServerFactory.getCacheServer(__redisConfig.prefix, redisConn);
            cacheServer.find(userId.toString(), function (error, result) {
                if (error) {
                    logger.error(error);
                    return callback(error);
                }
                if (result !== null) {
                    cacheServer.remove(userId.toString(),function(err){
                        callback();
                    });
                }else{
                    logger.warn("服务端没有登录信息，无法完成登出");
                    return callback(500);
                }

            });
        }
    };

    return authModel;
};

