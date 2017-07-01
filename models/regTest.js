


/**
 * @module regTest
 * @description 对于需要验证的参数格式统一配置验证机制
 */
module.exports = function(){

    /**
     * @description  电话号码验证的正则表达式
     * @example
     *      /(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/
     */
    var PHONE_REG = /(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/;
    /**
     * @description  email验证的正则表达式
     * @example /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
     */
    var EMAIL_REG = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

    var regTest = {
        /**
         * @func 验证登陆用户名格式为邮箱或电话号码
         * @param operatorUsername
         * @returns {boolean}
         */
        testOperatorUsername:function(operatorUsername){
            return !EMAIL_REG.test(operatorUsername) && !PHONE_REG.test(operatorUsername);
        }
    };

    return regTest;


};