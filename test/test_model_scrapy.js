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
        xit(".start()", sinon.test(function(done) {
            this.timeout(10000);
            logger.trace('start test scrapy.start');
            var trackList = [
                // 'https://www.lagou.com/jobs/2678740.html',//lagou nodejs
                //bosszhipin
                //neitui
                "https://www.bilibili.com/ranking#!/all/0/0/3/"//bilibili
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
        xit(".start()", sinon.test(function(done) {
                this.timeout(10000);
                logger.trace('start test scrapy.start');
                var trackList = [
                    // 'https://www.lagou.com/jobs/2678740.html',//lagou nodejs
                    //bosszhipin
                    //neitui
                    "http://top.baidu.com/buzz?b=1&c=513&fr=topcategory_c513"//baidu hot
                ];
                scrapyModel.startGBKUrl(trackList,function(err,result){
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

        it(".start()", sinon.test(function(done) {
                this.timeout(10000);
                logger.trace('start test scrapy.start get maoyan piaofan');
                var trackList = [
                    // 'https://www.lagou.com/jobs/2678740.html',//lagou nodejs
                    //bosszhipin
                    //neitui
                    "http://58921.com"//baidu hot
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
        /**
         * @static 测试translateRecruit()方法
         */
        xit(".translateRecruit()", sinon.test(function(done){
                this.timeout(10000);
                scrapyModel.translateCDNews(testData[0],function(err,result){
                    done();
                })
            })
        )
        /**
         * @static translateBaiduTops()方法
         */
        xit(".translateBaiduTops()", sinon.test(function(done){
                this.timeout(10000);
                scrapyModel.translateBaiduTops(testData[0],function(err,result){
                    done();
                })
            })
        )

        /**
         * @static translateBaiduTops()方法
         */
        it(".translateMoviePiaoFang()", sinon.test(function(done){
                this.timeout(10000);
                scrapyModel.translateMoviePiaofang(testData[0],function(err,result){
                    logger.debug(result);
                    done();
                })
            })
        )
    });
});
