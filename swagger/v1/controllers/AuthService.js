
'use strict';
var Logger = require('logger-romens');
var logger = new Logger();
var _ = require("lodash");
var async = require('async');
var authModel = require('./model/AuthModel')();
var regTest = require('../../../models/regTest')();
exports.deleteAuth = function(req,args, res, next) {
  /**
   * parameters expected in the args:
  * operatorUsername (String)
  **/

  logger.debug('req.user: ' + JSON.stringify(req.user));
    if(_.isUndefined(req.user) || _.isEmpty(req.user)) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        return res.end(JSON.stringify({error: '用户未登录.'}|| {}, null, 2));
  }
  var userId = req.user.userId;
  authModel.deleteAuth(userId,function(err,result){
      if(err){
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          return res.end(JSON.stringify({error: '服务端错误，登出操作失败.'}|| {}, null, 2));
      }
      logger.info("登出成功");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({msg: '登出成功.'}|| {}, null, 2));
  })
};

exports.postAuth = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (AuthInfo)
  **/
    logger.trace('enter post_auth');

    var username = args.body.value.operatorUsername;
    var password = args.body.value.operatorPassword;

    logger.debug('username: ' + JSON.stringify(username));
    logger.debug('password: ' + JSON.stringify(password));

    // step1. 用户名格式检测[电话号码/邮箱地址]
    if (regTest.testOperatorUsername(username)) {
        logger.error('登录用户名格式有误, 请重新输入, username: ' + username);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 403;
        res.end(JSON.stringify({error: '登录用户名格式有误, 请重新输入'}|| {}, null, 2));
        return;
    }
    // step2. 登录密码解密
    // todo 密码加解密方式未定, 待定后实现。
    var decodedPassword = password;
    var loginData = {
        username:username,
        password:decodedPassword
    };
    var isSuccessLogin = false;
    var StatusCode = "";
    var fbData = {};
    // step3. 登录认证
    async.series([
       //从yy365的账号登录
       function(done){
          authModel.yy365LoginAuth(loginData,function(err,result){
              if(err){
                  return done(err);
              }
              if(result === "NEXT"){
                  //未通过yy365验证但不属于用户名密码不符
                  done();
              }else if( result ==="403"){
                  //未通过yy365验证且属于用户名密码不符
                  done(null,{StatusCode:403})
              }else{
                  //通过yy365验证 返回token数据
                  isSuccessLogin = true;
                  fbData = result;
                  done();
              }
          })
       },
       //从cloud Operators的账号登录
       function(done){
          if(isSuccessLogin){
                return done();
          }
          authModel.adminLoginAuth(loginData,function(err,result){
              if(err){
                  return done(err);
              }
              if(result === "NEXT"){
                  //未通过验证但不属于用户名密码不符
                  done();
              }else if( result ==="403"){
                  //未通过验证且属于用户名密码不符
                  StatusCode = result;
                  done(null,{StatusCode:403})
              }else{
                  //通过验证 返回token数据
                  isSuccessLogin = true;
                  fbData = result;
                  done();
              }
          })

       },
       //从customer的账号登录
       function(done){
           if(isSuccessLogin){
               return done();
           }
           authModel.customerLoginAuth(loginData,function(err,result){
               if(err){
                   return done(err);
               }
               if(result === "NEXT"){
                   //未通过验证但不属于用户名密码不符
                   done();
               }else if( result ==="403"){
                   //未通过验证且属于用户名密码不符
                   StatusCode = result;
                   done(null,{StatusCode:403})
               }else{
                   //通过验证 返回token数据
                   isSuccessLogin = true;
                   fbData = result;
                   done();
               }
           })
       },
       //其他未知情况导致登陆不成功
       function(done){
           if(isSuccessLogin){
                return done();
            }
            done();
       }
    ],function(err,results){
        if(isSuccessLogin){
            logger.info("登录成功，返回token数据"+JSON.stringify(fbData));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(fbData|| {}, null, 2));
        }else if(!isSuccessLogin && StatusCode ==="403"){
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = StatusCode;
            return res.end(JSON.stringify({error: '用户名与密码不符,请重试.'}|| {}, null, 2));
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            return res.end(JSON.stringify({error: '服务端内部错误.'}|| {}, null, 2));
        }
    });
};

