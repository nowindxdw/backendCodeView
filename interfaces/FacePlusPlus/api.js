/**
 * Created by dawei on 2017/9/5.
 */
'use strict';
const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const superagent = require('superagent');

const apiPath = {
    "DETECT":"https://api-cn.faceplusplus.com/facepp/v3/detect",
    "COMPARE":"https://api-cn.faceplusplus.com/facepp/v3/compare"
};

module.exports = {
    /**
     *
     * 描述
         传入图片进行人脸检测和人脸分析。
         可以检测图片内的所有人脸，对于每个检测出的人脸，会给出其唯一标识 face_token，
         可用于后续的人脸分析、人脸比对等操作。
         对于正式 API Key，支持指定图片的某一区域进行人脸检测。
     图片要求
         图片格式：JPG(JPEG)，PNG
         图片像素尺寸：最小 48*48 像素，最大 4096*4096 像素
         图片文件大小：2 MB
         最小人脸像素尺寸： 系统能够检测到的人脸框为一个正方形，正方形边长的最小值为图像短边长度的 48 分之一，
         最小值不低于 48 像素。 例如图片为 4096*3200 像素，则最小人脸像素尺寸为 66*66 像素。
     必选
        api_key    String  调用此API的API Key
     必选
        api_secret  String  调用此API的API Secret
     必选（三选一）
     image_url  String  图片的 URL。
        注：在下载图片时可能由于网络等原因导致下载图片时间过长，建议使用 image_file 或 image_base64 参数直接上传图片。
     image_file File    一个图片，二进制文件，需要用post multipart/form-data的方式上传。
     image_base64	String    base64 编码的二进制图片数据
            如果同时传入了 image_url、image_file 和 image_base64 参数，本API使用顺序为 image_file 优先，image_url 最低。
     可选
     return_landmark    Int 是否检测并返回人脸关键点。合法值为：1检测   0不检测
     注：本参数默认值为 0
     可选
     return_attributes  String  是否检测并返回根据人脸特征判断出的年龄、性别、情绪等属性。合法值为：
     none   不检测属性   注：本参数默认值为 0
     gender age smiling headpose    facequality blur
     eyestatus  emotion ethnicity   beauty
     mouthstatus    eyegaze 希望检测并返回的属性。需要将属性组成一个用逗号分隔的字符串，属性之间的顺序没有要求。
     注：由于提供了 eyestatus，所以 glass 参数将被移除（计划时间 2017-9-30），请尽快修改程序使用 eyestatus

     curl -X POST "https://api-cn.faceplusplus.com/facepp/v3/detect" -F "api_key=<api_key>" \
     -F "api_secret=<api_secret>" \
     -F "image_file=@image_file.jpg" \
     -F "return_landmark=1" \
     -F "return_attributes=gender,age"
     *
     */
    postFaceDetect:function(api_key,api_secret,imageBase64,landmark,attributes,callback){
        let method = "POST";
        let url = apiPath.DETECT;
        let options = {
            api_key:api_key,
            api_secret :api_secret,
            image_base64 :imageBase64,
            return_landmark : landmark,
            return_attributes : attributes
        };
        send(method,url,options,function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,result);
            }
        })

    },

};
function send(method,url,options,callback){
    superagent(method, url)
        .send(options)
        .set('content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err,res){
            if(res&&res.ok){
                callback(null,res)
            }else{
                callback(err);
            }
        });

}

