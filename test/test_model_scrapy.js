var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger();
var scrapyModel = require('../models/scrapy')();
/**
 * @module scrapy单元测试用例
 */
describe(" unit tests for scrapy", function(){
    /**
     * @description  测试组件module
     */
    describe("#scrapy model", function(){
        /**
         * @static 测试scrapy.start()方法
         */
        it(".start()", sinon.test(function(done) {
            this.timeout(10000);
            logger.trace('start test scrapy.start');
            var trackList = [

            ];
            scrapyModel.start(trackList,function(err,result){
                if(err){
                    logger.error(err.stack);
                }else{
                    logger.debug(result);
                }
                done();
            })
        })
        );
        /**
         * @static 测试ShipModel.getShipDetails()方法
         */
        xit(".translateRecruit()", sinon.test(function(done){
                this.timeout(10000);
                done();
            })
        )
    });
});