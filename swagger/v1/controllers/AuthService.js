"use strict";
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
const _ = require("lodash");
const async = require('async');
const authModel = require('./model/AuthModel')();
const regTest = require('../../../models/regTest')();
const RETCODE = require("../../../models/retcode").RETCODE;
const MSG = require("../../../local/local")[__localConfig];
const crypto = require("../../../models/crypto")();
exports.deleteAuth = function(req,args, res, next) {
  /**
   * parameters expected in the args:
  * operatorUsername (String)
  **/

  logger.debug('req.user: ' + JSON.stringify(req.user));
    if(_.isUndefined(req.user) || _.isEmpty(req.user)) {
        res.statusCode = 400;
        return res.end(JSON.stringify({error: MSG.UNAUTHORIZED}|| {}, null, 2));
  }
  let userId = req.user.userId;
  return authModel.deleteAuth(userId)
    .then(result=>{
        logger.info("登出成功");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({msg: MSG.SUCCESS}|| {}, null, 2));
    })
    .catch(err=>{
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        return res.end(JSON.stringify({error: MSG.INTER_ERR}|| {}, null, 2));
    })
};

exports.postAuth = function(args, res, next) {
    /**
     * parameters expected in the args:
     * body (AuthInfo)
     **/
    logger.trace('enter post_auth');

    let username = args.body.value.operatorUsername;
    let password = args.body.value.operatorPassword;

    logger.debug('username: ', username);
    logger.debug('password: ', password);

    // step1. 用户名格式检测[电话号码/邮箱地址]
    if (regTest.testOperatorUsername(username)) {
        logger.error('登录用户名格式有误, 请重新输入, username: ', username);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 403;
        res.end(JSON.stringify({error: MSG.UNAUTHORIZED} || {}, null, 2));
        return;
    }
    // step2. 登录密码前端回传解密，前端用base64加密
    let decodedPassword = crypto.decodeFrontLoginPwd(password);
    let loginData = {
        username: username,
        password: decodedPassword
    };
    // step3. 登录认证
    return authModel.adminLoginAuth(loginData)
        .then(data=>{
            if(data==RETCODE.UNAUTHORIZED){
                return res.end(JSON.stringify({error: MSG.LOGIN_FAILED} || {}, null, 2));
            }else{
                logger.info("登录成功，返回token数据" + JSON.stringify(data));
                res.statusCode = RETCODE.SUCCESS;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(data || {}, null, 2));
            }
        })
        .catch(err=>{
            logger.warn("登录异常"+err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = err;
            return res.end(JSON.stringify({error: MSG.INTER_ERR} || {}, null, 2));

        })
}

