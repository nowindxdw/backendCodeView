var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
global.__logConfig = config.get('logger');
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger(__logConfig);
var osIns = require('../models/OsInspector');
/**
 * @module Utils单元测试用例
 */
describe(" unit tests for OsInspector", function(){
    /**
     * @description  测试组件module
     */
    describe("#OsInspector model", function(){

        /**
         * @static OsInspector.getSysInfo()方法
         */
        it(".getSysInfo()", function(done) {
            this.timeout(10000);
            logger.trace('start test OsInspector.getSysInfo');
            osIns.getSysInfo(function(err,result){
                if(err){
                    logger.error(err);
                }else{
                    logger.trace(result);
                }
                done();
            })
        })
    });
});
