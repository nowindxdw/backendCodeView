var Logger = require("logger-romens");
var logger = new Logger();
var _ = require("lodash");
var moment = require("moment");
var config = require('config');
var schedulerConfig = config.get("scheduler");
var schedulerClient = require("scheduler-client-romens")();
// the middleware function\
/**
 * @module  schedulerCaller.js
 * @description jwt中间件调用module
 * @returns {Function}
 */
module.exports = function (onoff) {
    logger.info(">>>>>>>>>>schedulerCaller is " + onoff + "<<<<<<<<<<<<");
    return function (req, res, next) {
        if (onoff !== 'on') {
            return next();
        }
        var callPath = /^\/scheduler\/callback/;
        if (!(callPath.test(req.path) && (req.method === 'POST'))) {
            return next();
        }
        logger.trace("enter into scheduler callback");
        //do something with req
        //verify token
        var statusToken = req.query.statusToken;//获取离线服务回来的token信息
        if(_.isEmpty(statusToken)){
            return res.status(500)(new Error("invalid token"));
        }
        //scheduler是异步通知机制，不需要直接返回回调信息；
        receiveSchedulerCaller(req);
        return res.status(200).json("离线任务已送达");
    };
    function receiveSchedulerCaller(req){
        logger.debug(req.body);
        var bodyData = req.body;
        var statusToken = req.query.statusToken;
        if(bodyData.action == 'startScrapyLagou') {
            logger.info("startScrapyLagou");
            var data = bodyData.startUrl;
            startScrapyLagou(data,statusToken);
        }else if(bodyData.action == "sampleAction2"){
            //处理同步任务的G3基础数据离线任务
            logger.info("开始sampleAction2");
            var ownerSfId = bodyData.ownerSfId;
            var syncStartAt = bodyData.syncStartAt||"2012-01-01";
            var pageSize = bodyData.pageSize||200;
            sampleAction2(ownerSfId, syncStartAt,pageSize, statusToken);
        }else if(bodyData.action == "restartKue") {
            logger.info("重启队列任务");
            restartKueJob(statusToken);
        } else if(bodyData.action == "clearKue"){
            logger.info("清理队列任务");
            if(statusToken=="1234567891010"){
                var filter = bodyData.filter;
                clearKueJob(filter,statusToken);
            }else {
                logger.warn("invalid token");
            }

        }else if(bodyData.action == "resetKue") {
            logger.info("重置队列任务");
            if (statusToken == "1234567891010") {
                var filter = bodyData.filter;
                resetKueJob(filter, statusToken);
                callback(null,"reset done");
            } else {
                return callback(new Error("invalid token"))
            }
        }else if(bodyData.action == "countKue") {
            logger.info("统计队列任务");
            if (statusToken == "1234567891010") {
                var filter = bodyData.filter;
                countKueJob(filter, function(err,result){
                    callback(null,result);
                });
            } else {
                return callback(new Error("invalid token"))
            }
        }else{
                logger.warn("未定义的处理离线任务类型");
            }
        }

    function startScrapyLagou(oriUrl,statusToken){
        logger.info("enter sample action1,oriUrl"+oriUrl+"statusToken:"+statusToken);
        var scrapyModel = require('./scrapy')();
        var sqlCRUD = require('./SqlCRUDModel');
        var async = require('async');
        var dbName = config.get('mysql').cloudDBPrefix;
        //递归拉取所有页面并存入数据库
        function scrapyLagou(urls){
            if(urls.length ===0){
                return ;
            }
            scrapyModel.start(urls,function(err,results){
               async.mapSeries(results,
                    function(item,mpCb){
                        scrapyModel.translateRecruitLagou(item,'nodejs',function(err,transData){
                            var insertData = transData.recruitObj;
                            if(_.isEmpty(insertData)){
                                var nextUrls = transData.similarUrls;
                                scrapyLagou(nextUrls);
                                mpCb(err,transData);
                            }else{
                                return sqlCRUD.insert(dbName,'Recruits',insertData)
                                    .then(function(){
                                        var nextUrls = transData.similarUrls;
                                        scrapyLagou(nextUrls);
                                        mpCb(err,transData);
                                    })
                            }
                        })
                    },
                    function(errs,results){
                        logger.info("urls="+JSON.stringify(urls)+"done")
                    })
            })
        }
        scrapyLagou([oriUrl]);
        //todo 回传给离线任务服务
        // var status = "SUCCESS";
        // logger.info("离线任务startScrapy执行完毕，执行状态"+status);
        // var taskUrl = schedulerConfig.url;
        // var taskToken = statusToken;
        // var taskResult = {
        //   status:status
        // };
        // return schedulerClient.taskStatusPost(taskUrl, taskToken, taskResult)

    }
    function sampleAction2(ownerSfId, syncStartAt,pageSize, statusToken){
        //todo not implement func
        logger.warn("func sampleAction2  to do")
    }
    function countKueJob(filter,callback){
        var jobs = __kue.getJobs();//获取所有jobs的对象
        logger.trace("count filter :",filter);
        if(filter.state == "complete"){
            jobs.completeCount( filter.type, function( err, total ) {
                logger.debug("count",total);
                callback(null,total)
            });
        }else if(filter.state == "failed"){
            jobs.failedCount( filter.type, function( err, total ) {
                logger.debug("count",total);
                callback(null,total)
            });
        }else if(filter.state == "active"){
            jobs.activeCount( filter.type, function( err, total ) {
                logger.debug("count",total);
                callback(null,total)
            });
        }else if(filter.state == "inactive"){
            jobs.inactiveCount(filter.type,  function( err, total ) {
                logger.debug("count",total);
                callback(null,total);
            })
        }
    }
    function resetKueJob(filter,statusToken){
        var jobs = __kue.getJobs();//获取所有jobs的对象
        logger.trace("reset filter :",filter);
        if(filter.state == "complete"){
            jobs.complete( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        if(job&&job.type&&(job.type == filter.type)){
                            job.inactive();
                        }
                    });
                });
            })
        }else if(filter.state == "failed"){
            jobs.failed( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        if(job&&job.type&&(job.type == filter.type)){
                            job.inactive();
                        }
                    });
                });
            })
        }else if(filter.state == "active"){
            jobs.active( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        job.inactive();
                    });
                });
            });
        }
        var status = "SUCCESS";
        var schedulerClient = require("scheduler-client-romens")();
        var taskUrl = __schedulerConfig.url;
        var taskToken = statusToken;
        var taskResult = {
            status:status
        };
        return schedulerClient.taskStatusPost(taskUrl, taskToken, taskResult)
    }
    function clearKueJob(filter,statusToken){
        var jobs = __kue.getJobs();//获取所有jobs的对象
        logger.trace("clear filter :",filter);
        if(filter.state == "complete"){
            jobs.complete( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        if(job&&job.type&&(job.type == filter.type)){
                            job.remove(function(err){
                                if(err){
                                    logger.warn("id="+id+"remove err"+JSON.stringify(err));
                                }
                            })
                        }
                    });
                });
            })
        }else if(filter.state == "failed"){
            jobs.failed( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        if(job&&job.type&&(job.type == filter.type)){
                            job.remove(function(err){
                                if(err){
                                    logger.warn("id="+id+"remove err"+JSON.stringify(err));
                                }
                            })
                        }
                    });
                });
            })
        }else if(filter.state == "active"){
            jobs.active( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        job.inactive();
                    });
                });
            });
        }else if(filter.state == "inactive"){
            jobs.inactive( function( err, ids ) {
                ids.forEach( function( id ) {
                    __kue.Job.get( id, function( err, job ) {
                        if(job&&job.type&&(job.type == filter.type)){
                            job.remove(function(err){
                                if(err){
                                    logger.warn("id="+id+"remove err"+JSON.stringify(err));
                                }
                            })
                        }
                    });
                });
            })
        }
        var status = "SUCCESS";
        var schedulerClient = require("scheduler-client-romens")();
        var taskUrl = schedulerConfig.url;
        var taskToken = statusToken;
        var taskResult = {
            status:status
        };
        return schedulerClient.taskStatusPost(taskUrl, taskToken, taskResult)
    }
    function restartKueJob(statusToken){
        var status = "SUCCESS";
        var jobs = __kue.getJobs();//获取所有jobs的对象
        //当active == 0 而inactive ！=0 时重启队列
        jobs.active( function( err, ids ) {
            if(ids.length == 0){
                jobs.inactive( function( err, ids ) {
                    if(ids.length>0){
                        var id = ids[0];
                        __kue.Job.get( id, function( err, job ) {
                            var key = job.type;
                            var jobProcessModel = require(__base + "/models/JobProcessModel")();
                            jobProcessModel.startJobProcess(key);
                            var schedulerClient = require("scheduler-client-romens")();
                            var taskUrl = schedulerConfig.url;
                            var taskToken = statusToken;
                            var taskResult = {
                                status:status
                            };
                            return schedulerClient.taskStatusPost(taskUrl, taskToken, taskResult);
                        });
                    }
                })
            }
        });
    }
};
