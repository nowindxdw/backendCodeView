"use strict";
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
const _ = require("lodash");
const async = require('async');
const authModel = require('./model/AuthModel')();
const logModel = require('./model/LogModel')();
const regTest = require('../../../models/regTest')();
const Utils = require('../../../models/Utils');
const RETCODE = require("../../../models/retcode").RETCODE;
const MSG = require("../../../local/local")[__localConfig];
const crypto = require("../../../models/crypto")();
exports.deleteAuth = function(args, req, res, next) {
  /**
   * parameters expected in the args:
  * operatorUsername (String)
  **/

  logger.debug('req.user: ' + JSON.stringify(req.user));
    if(_.isUndefined(req.user) || _.isEmpty(req.user)) {
        res.statusCode = RETCODE.UNAUTHORIZED;
        return res.end(MSG.UNAUTHORIZED);
  }
  let userId = req.user.userId;

  let operatorId = userId;
  let ip = Utils.getReqInfo(req).ip;
  let action = "LOGOUT";
  let remark = "";
  return authModel.deleteAuth(userId)
    .then(result=>{
        logger.info("登出成功");
        res.statusCode = RETCODE.SUCCESS;
        res.setHeader('Content-Type', 'application/json');
        res.end(MSG.SUCCESS);
        return logModel.saveOperatorLog(operatorId,ip,action,"SUCCESS",remark);
    })
    .catch(err=>{
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = RETCODE.INTER_ERR;
        res.end(MSG.INTER_ERR);
        return logModel.saveOperatorLog(operatorId,ip,action,"FAIL",remark);
    })
};

exports.postAuth = function(args, req, res, next) {
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
        res.statusCode = RETCODE.UNAUTHORIZED;
        res.end(MSG.UNAUTHORIZED);
        return;
    }
    // step2. 登录密码前端回传解密，前端用base64加密
    let decodedPassword = crypto.decodeFrontLoginPwd(password);
    let loginData = {
        username: username,
        password: decodedPassword
    };
    // operatorlog data
    let operatorId = username;
    let ip = Utils.getReqInfo(req).ip;
    let action = "LOGIN";
    let remark = "";
    // step3. 登录认证
    return authModel.checkFailcount(operatorId)
        .then(function(retCode){
            if(retCode==RETCODE.SUCCESS){
                return authModel.adminLoginAuth(loginData);
            }else{
                return retCode;
            }
        })
        .then(data=>{
            if(data==RETCODE.UNAUTHORIZED){
                res.statusCode = RETCODE.UNAUTHORIZED;
                res.setHeader('Content-Type', 'application/json');
                res.end(MSG.LOGIN_FAILED);
            }else if(data==RETCODE.NOT_FOUND){
                res.statusCode = RETCODE.NOT_FOUND;
                res.setHeader('Content-Type', 'application/json');
                return res.end(MSG.NOT_FOUND);
            }else if(data==RETCODE.BAD_REQUEST){
                res.statusCode = RETCODE.BAD_REQUEST;
                res.setHeader('Content-Type', 'application/json');
                return res.end(MSG.TRY_OVER_LIMIT);
            }else{
                logger.info("登录成功，返回token数据" + JSON.stringify(data));
                res.statusCode = RETCODE.SUCCESS;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data || {}, null, 2));
                return logModel.saveOperatorLog(operatorId,ip,action,"SUCCESS",remark);
            }
        })
        .catch(err=>{
            logger.warn("登录异常"+err);
            res.statusCode = RETCODE.INTER_ERR;
            res.setHeader('Content-Type', 'application/json');
            res.end(MSG.INTER_ERR);
            return logModel.saveOperatorLog(operatorId,ip,action,"FAIL",remark)
                .then(res=>{
                    return authModel.addFailcount(operatorId);
                });
        })
};

exports.getLogin = function(args, req, res, next) {
    logger.trace('get Login page');
    res.render('dashboard/'+'login.ejs');
};