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
    });
});
