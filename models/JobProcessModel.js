
var Logger = require("logger-romens");
var logger = new Logger();
var _ = require("lodash");
var moment = require("moment");
var statusCode = require("./statusCode");
/**
 * @module  JobProcessModel.js
 * @description 队列启动/重启执行任务
 * @returns {Function}
 */
module.exports = function () {
    var model = {
        /**
         * 启动/重启队列方法
         * @param key
         */
        startJobProcess: function (key){
            logger.trace("start process job type = "+key);
            var jobs = __kue.getJobs();//获取所有jobs的对象
            jobs.activeCount(key,function(err,totalActive){
                if(totalActive==0) {
                    if(key.includes("ImgUpload")){
                        //startImgUpload(key);
                    }else if(key.includes("PushShipData")){
                        //startPushShipData(key);
                    }else if(key.includes("PushFlowData")){
                        //startPushFlowData(key);
                    }else if(key.includes("PushStockData")){
                        startPushStockData(key);
                    }else if(key.includes("ErpMsgIn")){
                        //startErpMsgIn(key);
                    }else{
                        logger.warn("undefined key");
                    }
                }
            })
        }
    };
    return model;

    function startPushStockData(key){
        var jobs = __kue.getJobs();//获取所有jobs的对象（其实是kue的单例对象）
        jobs.process(key, function (job, done) {
            job.log('[info] Task:' + job.type + '#' + job.id + ' has been executed');//这个log写入了redis记录
            // var ownerSfId = job.data.ownerSfId;
            // var dbName = job.data.dbName;
            // var type = job.data.type;
            // var flowStockObj = job.data.flowStockObj;
            // var flowModel = require(__base + "/models/FlowModel")();
            // flowModel.pushEDXFlowStockData(dbName, ownerSfId, type,flowStockObj,function(err,result){
            //     if(err){
            //         job.log('[error] Task:' + job.type + '#' + job.id + '数据推送到edx失败' + err);
            //         return done("数据推送到edx失败");
            //     }else{
            //         job.log('[INFO] Task:' + job.type + '#' + job.id + '同步出库单信息到edx成功.');
            //         return done(null, "同步出库单信息到edx成功");
            //     }
            // })
        });

    }
};
