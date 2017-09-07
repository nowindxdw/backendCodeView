/**
 * Created by dawei on 2017/7/18.
 */
'use strict';
const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const superagent = require('superagent');
const moment = require('moment');
const genTool = require('./genarateKey');
const apiPath = {
    "DETECT":"http://service.image.myqcloud.com/face/detect",
};
module.exports = {
    /**
     * 人脸检测
     检测给定图片中的所有人脸( Face )的位置和相应的面部属性，位置包括(x, y, w, h)，
     面部属性包括性别( gender ), 年龄( age ), 表情( expression ),
     魅力( beauty ), 眼镜( glass )和姿态 (pitch，roll，yaw )。
     使用 image 则使用 multipart/form-data 格式
     使用非image 则使用 application/json 格式
     参数名	是否必须	类型	参数说明
     appid	必须	String	项目 ID
     mode	可选	Int	检测模式：0-所有人脸，1-最大的人脸
     image	可选	Binary	图片内容
     url	可选	String	图片的 url , image 和 url 只提供一个就可以了,如果都提供,只使用 url
     *
     */
    qcloudFaceDetect:function(app_id,secret_id,secret_key,bucket,img_url,mode,callback){
      let method = "POST";
      let url = apiPath.DETECT;
      let expiredTime = Math.round(+new Date()/1000) +2592000;
      let auth = genTool.genKey(app_id,bucket,secret_id,secret_key,expiredTime);
      let options = {
        appid:app_id,
        mode :mode,
        url:img_url
      };
      send(auth,method,url,options,function(err,result){
        if(err){
          logger.error(err);
          callback(err);
        }else{
          logger.debug(result);
          callback(null,result);
        }
      })

    },

};
function send(auth,method,url,options,callback){
  superagent(method, url)
    .send(options)
    .set('Authorization', auth)
    .set('content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end(function(err,res){
      if(res&&res.ok){
        callback(null,res)
      }else{
        callback(err);
      }
    });

}


