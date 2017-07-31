'use strict';
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
const regTest = require('../../../models/regTest')();
const RETCODE = require("../../../models/retcode").RETCODE;
const MSG = require("../../../local/local")[__localConfig];
const contactModel = require('./model/ContactModel')();
const logModel = require('./model/LogModel')();
const _ = require('lodash');
const Utils = require('../../../models/Utils');
exports.sendContactMail = function(args, req, res, next) {
  /**
   * 发送邮件
   * 发送邮件信息
   *
   * body Body_2 发送信息
   * no response value expected for this operation
   **/
  logger.trace('enter sendContactMail');
  let body = args.body.value;
  logger.debug(body);
  let name = body.name;
  let email = body.email;
  let message = body.message;
  if(_.isEmpty(name)||_.isEmpty(message)){
      res.statusCode = RETCODE.BAD_REQUEST;
      return res.end(JSON.stringify({error: MSG.BAD_REQUEST}|| {}, null, 2));
  }
  if (!regTest.testEmail(email)) {
      res.statusCode = RETCODE.BAD_REQUEST;
      return res.end(JSON.stringify({error: MSG.BAD_REQUEST}|| {}, null, 2));
  }
  //build operator log
  let operatorId = name;
  let ip = Utils.getReqInfo(req).ip;
  let action = "SEND_CONCACT_MSG";
  let remark = message+" FROM :"+email;
  return contactModel.sendEmail(name,email,message)
      .then(result=>{
          logger.info("发送email"+email+" from name="+name+" 成功");
          res.statusCode = RETCODE.SUCCESS;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({msg: MSG.SUCCESS}|| {}, null, 2));
          return logModel.saveOperatorLog(operatorId,ip,action,"SUCCESS",remark)
      })
      .catch(err=>{
          logger.info("发送email"+email+" from name="+name+" 失败");
          res.statusCode = RETCODE.INTER_ERR;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({msg: MSG.INTER_ERR}|| {}, null, 2));
          return logModel.saveOperatorLog(operatorId,ip,action,"FAIL",remark);
      });
}

