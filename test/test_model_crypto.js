var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger();
var cryptoModel = require('../models/crypto')();
/**
 * @module crypto单元测试用例
 */
describe(" unit tests for crypto", function(){
    /**
     * @description  测试组件module
     */
    describe("#crypto model", function(){
        /**
         * @static crypto.decodeFrontLoginPwd()方法
         */
        it(".decodeFrontLoginPwd()", sinon.test(function() {
                this.timeout(10000);
                logger.trace('start test crypto.decodeFrontLoginPwd');
                var pwdFront = "MTAwODIx";
                var pwd = cryptoModel.decodeFrontLoginPwd(pwdFront);
                assert.equal(pwd,"100821");
            })
        );
        /**
         * @static crypto.encodeLoginPwd()方法
         */
        it(".encodeLoginPwd()", sinon.test(function() {
                this.timeout(10000);
                logger.trace('start test crypto.encodeLoginPwd');
                var pwd = "100821";
                var enPwd = cryptoModel.encodeLoginPwd(pwd);
                assert.equal(enPwd,"VFZSQmQwOUVTWGc9");
            })
        );
        /**
         * @static crypto.decodeLoginPwd()方法
         */
        it(".decodeLoginPwd()", sinon.test(function() {
                this.timeout(10000);
                logger.trace('start test crypto.decodeLoginPwd');
                var pwd = "VFZSQmQwOUVTWGc9";
                var dePwd = cryptoModel.decodeLoginPwd(pwd);
                assert.equal(dePwd,"100821");
            })
        );
        /**
         * @static crypto.md5Simple()方法
         */
        it(".md5Simple()", sinon.test(function() {
                this.timeout(10000);
                logger.trace('start test crypto.md5Simple');
                var pwd = "12121313";
                var enPwd = cryptoModel.md5Simple(pwd);
                // logger.debug(enPwd);
                assert.equal(enPwd,"b0d52a5d6a019f6b35ad700cc2f4b755");
            })
        );

    });
});
