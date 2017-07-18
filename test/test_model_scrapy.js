var sinon = require('sinon');
var assert = require('chai').assert;
var Logger = require('logger-romens');
var config = require("config");
global.__logConfig = config.get('logger');
var logger = new Logger(__logConfig);
var scrapyModel = require('../models/scrapy')();
/**
 * @module scrapy单元测试用例
 */
describe(" unit tests for scrapy", function(){
    /**
     * @description  测试组件module
     */
    describe("#scrapy model", function(){
        var testData = undefined;
        /**
         * @static 测试scrapy.start()方法
         */
        it(".start()", sinon.test(function(done) {
            this.timeout(10000);
            logger.trace('start test scrapy.start');
            var trackList = [
                // 'https://www.lagou.com/jobs/2678740.html',//lagou nodejs
                //bosszhipin
                //neitui
                "https://tianqi.2345.com/today-56294.htm"//weather
            ];
            scrapyModel.start(trackList,function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                    testData = result;
                }
                done();
            })
        })
        );
        /**
         * @static 测试translateRecruit()方法
         */
        xit(".translateRecruit()", sinon.test(function(done){
            this.timeout(10000);
            scrapyModel.translateRecruitLagou(testData[0],'nodejs',function(err,result){
                    done();
                })
            })
        )
    });
});
