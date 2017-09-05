'use strict';
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
let   config = require("config");
let   faceApi = require('../../../interfaces/FacePlusPlus/api.js');
const RETCODE = require("../../../models/retcode").RETCODE;
const MSG = require("../../../local/local")[__localConfig];
exports.getFacePlusPlus = function(args, res, next) {
  /**
   * 获取人脸识别页面
   * 展示人脸识别页面
   *
   * no response value expected for this operation
   **/
  res.render('faceplusplus/index.ejs');
}

exports.postFacePlusPlus = function(args, res, next) {
  /**
   * 人脸识别数据提交
   * 提交人脸识别数据
   *
   * body Body_1 登录验证信息
   * no response value expected for this operation
   **/
  let faceApiKey = config.get("faceApiKey");
  let faceApiSecret = config.get("faceApiSecret");
  let image_base64 = args.body.value.image_base64;
  let attributes = args.body.value.return_attributes;
  let landmark = 0;
  faceApi.postFaceDetect(faceApiKey,faceApiSecret,image_base64,landmark,attributes,function(err,result){
    if(err){
      logger.error(err.stack);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = RETCODE.INTER_ERR;
      res.end(MSG.INTER_ERR);
    }else{
      logger.debug(result.text);
      res.statusCode = RETCODE.SUCCESS;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result.text || {}, null, 2));
    }
  });
}

