var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
global.__logConfig = config.get('logger');
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger(__logConfig);
var email = require('../models/email');
/**
 * @module email
 */
describe(" unit tests for email", function(){
    /**
     * @description  测试组件module
     */
    describe("#email model", function(){

        /**
         * @static email.sendEmail()方法
         */
        it(".sendEmail()", function(done) {
                this.timeout(10000);
                logger.trace('start test mail.sendEmail');
                var dynamicConfig= {
                        subject : "A concat message from snow",
                        content : "This msg from concact box: hahahahaha,this is test email",
                        sendTo : "nowindxdw@126.com",
                        operatorName : "dawei"

                };
                email.sendEmail(dynamicConfig,function(err,result){
                    if(err){
                        logger.error(err);
                    }else{
                        logger.debug(result);
                    }
                    done();
                });

        })
    });
});
