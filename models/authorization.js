var jwt = require('jsonwebtoken');
var CacheServerFactory = require('cache-server-factory-romens');
var RedisConnectionFactory = require('redis-connection-factory-romens');
var DBSingleton = require("db-singleton");
var Logger = require("logger-romens");
var logger = new Logger();

// the middleware function\
/**
 * @module  authorization
 * @description jwt中间件调用module
 * @param isOn  是否开启该中间件功能
 * @returns {Function}
 */
module.exports = function(isOn) {
    console.log(">>>>>>>>>>authorization is "+isOn+"<<<<<<<<<<<<");
    return function (req, res, next) {
        if(!isOn){
            return next();
        }
        var apiPath = /^\/v1\/api(\/){1}/;
        var indexPath = /^\/v1\/api\/index/;
        var loginPagePath = /^\/v1\/api\/login/;
        var loginPath = /^\/v1\/api\/auth/;
        if (!apiPath.test(req.path)) {
            return next();
        }
        if (loginPath.test(req.path) && (req.method === 'POST')) {
            return next();
        }
        if (indexPath.test(req.path) && (req.method === 'GET')) {
            return next();
        }
        if (loginPagePath.test(req.path) && (req.method === 'GET')) {
            return next();
        }
        var token = req.header('authorization');
        if (token === undefined || !token) {
            return res.status(401).end('invalid token');
        }

        checkToken(token, function (error, payload) {
            if (error) {
                return res.status(402).end('invalid token');
            }

            if (payload.exp < Date.now() / 1000) {
                return res.status(405).end('expired token');
            }
            var userId = payload.sub;
            checkLogout(userId,function(error,logout){
                if (error) {
                    return res.status(500).end('server error');
                }
                if(logout){
                    return res.status(405).end('用户已登出，请重新登录');
                }
                var db = payload.location;
                var role = payload.role;
                getBasicInfo(db, role,userId, function (error, user) {
                    if (error) {
                        var data = {
                            code: 5000,
                            message: error.code || error.message
                        };

                        return res.status(501).json(data);
                    }
                    req.user = user;
                    next();
                });
            })

        });
    }
};

/**
 * @func checkToken
 * @description 校验jwt token密码
 * @param token
 * @param callback
 */
function checkToken(token, callback) {
    jwt.verify(token, __authConfig.secret, function (error, payload) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, payload);
    });
}

/**
 * @func checkLogout
 * @description 校验是否登出状态
 * @param userId
 * @param callback
 * <table>
 *     <tr><td>true</td><td>已登出</td></tr>
 *     <tr><td>false</td><td>未登出</td></tr>
 * </table>
 */
function checkLogout(userId,cb){
    var isLogout = false;
    var redisConn = RedisConnectionFactory.getRedisConnection(__redisConfig);
    var cacheServer = CacheServerFactory.getCacheServer(__redisConfig.prefix, redisConn);

    cacheServer.find(userId.toString(), function (error, result) {
        if (error) {
            console.log(error);
            return cb(error);
        }
        if (result !== null) {
            if(typeof result =='string'){
                result = JSON.parse(result);
                isLogout = !result.isLogin;

            }
        }
        if(isLogout){
            cacheServer.remove(userId.toString(),function(err){
                cb(null,isLogout);
            });
        }else{
            cb(null, isLogout);
        }

    })
}
/**
 * @func getBasicInfo
 * @description 使用redis缓存数据库对应登录者的常用信息
 * @param db  取数据的数据库
 * @param role 登录的角色类型
 * @param userId 登录者id
 * @param cb
 */
function getBasicInfo(db, role, userId, cb) {
    console.log("redis config="+JSON.stringify(__redisConfig));
    var redisConn = RedisConnectionFactory.getRedisConnection(__redisConfig);
    var cacheServer = CacheServerFactory.getCacheServer(__redisConfig.prefix, redisConn);

    cacheServer.find(userId.toString(), function (error, result) {
        if (error) {
            console.log(error);
            return cb(error);
        }

        //客户登录验证且缓存数据不为空直接返回缓存数据
        if (result !== null) {
            if(typeof result =='string'){
                result = JSON.parse(result);
            }
            return cb(null, result);
        }
        //客户登录验证已通过新加缓存数据
        var user = {
            'userId': userId,
            'dbName': db,
            'isLogin':true
        };
        // role 用户验证渠道  平台：cloud  客户：customer  医药365平台：yy365  ;
        // 客户需要从customerDB取数据（暂无） 其他从cloudDB取数据
        var dbSingleton = DBSingleton();

        if(role === "cloud"){
            return dbSingleton.sequelize(__dbConfig.cloudDB).then(function (sequelize) {
                return sequelize.models.Operators.findOne({
                        where: {
                            operatorSfId: userId
                        }
                    })
                    .then(function (result) {
                        if (result) {
                            logger.trace(result);
                            user.role = role;
                            user.operatorUsername = result.operatorUsername;
                            user.opeatorAdmin = result.opeatorAdmin;
                            user.operatorName = result.operatorName;
                            user.visible = result.visible;
                            user.enabled = result.enabled;
                            user.mobile = result.mobile;
                            user.email = result.email;
                            user.operatorRoles = result.operatorRoles;
                            cacheServer.save(userId.toString(),user,__authConfig.expire);
                            cb(null,user)
                        }
                        else {
                            cb("DB_ERR")
                        }
                    })
            });
        }else if(role === "customer"){
            //todo add customerDB下客户新开通信息维护
            user.role = role;
            cacheServer.save(userId.toString(),user,__authConfig.expire);
            cb(null,user)
        }else if(role === "yy365"){
            return dbSingleton.sequelize(__dbConfig.cloudDB).then(function (sequelize) {
                return sequelize.models.Customers.findOne({
                        where: {
                            customerSfId: userId
                        }
                    })
                    .then(function (result) {
                        if (result) {
                            logger.trace(result);

                            user.role = role;
                            user.businessLicense = result.businessLicense;
                            user.customerOrgNo = result.customerOrgNo;
                            user.customerName = result.customerName;
                            user.customerAbbrName = result.customerAbbrName;
                            user.customerSubDomain = result.customerSubDomain;

                            cacheServer.save(userId.toString(),user,__authConfig.expire);
                            cb(null,user)
                        }
                        else {
                            cb("DB_ERR")
                        }
                    })
            });
        }

    });
}
