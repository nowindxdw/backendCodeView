var crypto = require('crypto');
/**
 * @module  JobProcessModel.js
 * @description 队列启动/重启执行任务
 * @returns {Function}
 */
module.exports = function () {
    var model = {
        decodeFrontLoginPwd: function (pwd){
            return base64decode(pwd);
        },

        decodeLoginPwd: function (str){
            return base64decode(base64decode(base64decode(str)));
        },

        encodeLoginPwd: function (pwd){
            return base64encode(base64encode(base64encode(pwd)));
        },
        md5Simple:function(str){
            return md5(str);
        }
    };
    return model;
    // base 64 node 计算
    // decode str = new Buffer('IUAjJA==', 'base64').toString()
    // var s = new Buffer(str).toString('base64');
    function base64encode(key){
        return new Buffer(key).toString('base64');
    }
    function base64decode(str){
        return new Buffer(str,'base64').toString();
    }

    function md5(str){
        var md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    }
};
