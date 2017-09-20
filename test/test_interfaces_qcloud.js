"use strict";
var sinon = require('sinon');
var assert = require('chai').assert;
var Logger = require('logger-romens');
var config = require("config");
global.__logConfig = config.get('logger');
var logger = new Logger(__logConfig);
var genKeyApi = require('../interfaces/qcloudApi/genarateKey.js');
var moment = require('moment');
var api = require('../interfaces/qcloudApi/api.js');
/**
 * @module qcloud api单元测试用例
 */
describe(" unit tests for qcloud++ api", function(){
    /**
     * @description  测试组件module
     */
    describe("#qcloud api model", function(){
        /**
         * @static 测试qcloud api方法
         */
        it(".generate key()", function() {
            this.timeout(10000);
            logger.trace('start test generate Key');
            const APPID = "1253969128";
            const SECRETID = "AKIDAIG7nIDmqkV4hDhdRCtU3Vq3CWnwRwqf";
            const SECRETKEY = "uhN0WvJbmpmcMbyCGMrBKH5iU7ezA9wF";
            const bucket = "dawei";
            const expiredTime = moment().unix()+2592000;//expired = Math.round(+new Date()/1000)+2592000
            const currentTime = moment().unix();
            let key = genKeyApi.genKey(APPID,bucket,SECRETID,SECRETKEY,expiredTime,currentTime);
            logger.debug(key);
        })

       it(".qcloudFaceDetect()", function(done) {
        this.timeout(10000);
         const app_id = "1253969128";
         const secret_id = "AKIDAIG7nIDmqkV4hDhdRCtU3Vq3CWnwRwqf";
         const secret_key = "uhN0WvJbmpmcMbyCGMrBKH5iU7ezA9wF";
         const bucket = "dawei";
         const mode = 1;
         const img_url = "http://dawei-1253969128.cossh.myqcloud.com/1284765857.jpg";
        api.qcloudFaceDetect(app_id,secret_id,secret_key,bucket,img_url,mode,function(err,result){
            logger.debug(result);
            done();
        })
       })
    });
});
