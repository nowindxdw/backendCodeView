var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
global.__logConfig = config.get('logger');
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger(__logConfig);
var Utils = require('../models/Utils');
/**
 * @module Utils单元测试用例
 */
describe(" unit tests for Utils", function(){
    /**
     * @description  测试组件module
     */
    describe("#Utils model", function(){

        /**
         * @static Utils.getLimitTailNum()方法
         */
        it(".md5Simple()", function() {
                this.timeout(10000);
                logger.trace('start test Utils.getLimitTailNum');
                var limitTailNum = Utils.getLimitTailNum();
                logger.debug(limitTailNum);
        })

        it(".getTodayWeather()", function(done) {
            this.timeout(10000);
            logger.trace('start test Utils.getTodayWeather');
            var ip = "";
            Utils.getTodayWeather(ip,function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                }
                done();
            });
        })
        it(".getTodayCDNews()", function(done) {
            this.timeout(10000);
            logger.trace('start test Utils.getTodayCDNews');
            Utils.getTodayCDNews(function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                }
                done();
            });
        })
        it(".getTodayHotBaidu()", function(done) {
            this.timeout(10000);
            logger.trace('start test Utils.getTodayHotBaidu');
            Utils.getTodayHotBaidu(function(err,result){
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
