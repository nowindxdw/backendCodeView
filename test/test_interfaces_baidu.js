"use strict";
var sinon = require('sinon');
var assert = require('chai').assert;
var Logger = require('logger-romens');
var config = require("config");
global.__logConfig = config.get('logger');
var logger = new Logger(__logConfig);
var api = require('../interfaces/baiduApi/api.js');

/**
 * @module baidu api单元测试用例
 */
describe(" unit tests for baidu api", function(){
    /**
     * @description  测试组件module
     */
    describe("#baidu api model", function(){
        /**
         * @static 测试baidu api方法
         */
        it(".getWeather()", function(done) {
            this.timeout(10000);
            logger.trace('start test baidu api.getWeather');
            var location="成都";
            var ak = config.get("baiduAK");
            var output = "json";
            api.getWeather(location,ak,output,function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                }
                done();
            });
        })

        it(".getIP()", function(done) {
            this.timeout(10000);
            logger.trace('start test baidu api.getIP');
            var ak = config.get("baiduAK");
            var ip = "";
            var coor = "";
            api.getIP(ip,ak,coor,function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                }
                done();
            });
        })

      it(".aiFaceClient()", function(done) {
        this.timeout(10000);
        logger.trace('start test baidu aiFaceClient');
        var fs = require('fs');
        var image = fs.readFileSync('public/assets/face/testFace.jpg');
        var base64Img = new Buffer(image).toString('base64');
        var options ='age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities';
        var AipFace = require("../interfaces/baiduApi/aiface").face;
// 设置APPID/AK/SK
        var APP_ID = config.get('baiduAIappId');
        var API_KEY = config.get('baiduAIapiKey');
        var SECRET_KEY = config.get('baiduAIsecretKey');
        var client = new AipFace(APP_ID, API_KEY, SECRET_KEY);
        client.detect(base64Img,{face_fields:options}).then(function(result) {
          logger.debug(result);
          done();

        });
      })
    });
});
