'use strict';
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
let   config = require("config");
let   faceApi = require('../../../interfaces/FacePlusPlus/api.js');
let   AipFace = require("../../../interfaces/baiduApi/aiface").face;
const RETCODE = require("../../../models/retcode").RETCODE;
const MSG = require("../../../local/local")[__localConfig];
const faceApiKey = config.get("faceApiKey");
const faceApiSecret = config.get("faceApiSecret");
const APP_ID = config.get('baiduAIappId');
const API_KEY = config.get('baiduAIapiKey');
const SECRET_KEY = config.get('baiduAIsecretKey');
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

exports.getFaceBaidu = function(args, res, next) {
  /**
   * 获取baidu人脸识别页面
   * 展示baidu人脸识别页面
   *
   * no response value expected for this operation
   **/
  res.render('faceBaidu/index.ejs');
}

exports.postFaceBaidu = function(args, res, next) {
  /**
   * baidu人脸识别数据提交
   * 提交baidu人脸识别数据
   *
   * body Body_2 登录验证信息
   * no response value expected for this operation
   **/

// 设置APPID/AK/SK
  let client = new AipFace(APP_ID, API_KEY, SECRET_KEY);
  let base64Img = args.body.value.image_base64;
  let attributes = args.body.value.return_attributes;
  client.detect(base64Img,{face_fields:attributes}).then(function(result) {
      res.statusCode = RETCODE.SUCCESS;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result || {}, null, 2));
  });
}

