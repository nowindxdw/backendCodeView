/**
 * Created by dawei on 17-7-4.
 */
var url = require('url');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var sprintf = require('sprintf');
var async = require('async');
var _ = require('lodash');
var Logger = require("logger-romens");
var logger = new Logger();

var TIMEFORMAT_REG = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/
module.exports = function () {
    var model = {

        /**
         * 并发抓取原始网页数据
         * @param trackList
         * @param callback
         */
        start: function (trackList, callback) {
            var urls = trackList;
            var ep = new eventproxy();
            ep.after("eventName", urls.length, function (urlResults) {
                callback(null, urlResults);
            });
            urls.forEach(function (url) {
                superagent.get(url)
                    .end(function (err, urlRes) {
                        ep.emit("eventName", [url, urlRes.text])
                    });
            });
        },
        /**
         * 根据业务翻译抓取内容存到数据库
         * @param data
         * @param callback
         */
        translateRecruitLagou: function (data, language, callback) {
            var url = data[0];
            logger.trace(url);
            var $ = cheerio.load(data[1]);
            //通过jquery方式获取内容链接
            var companyEle = $('body > div.position-head > div > div.position-content-l > div > div.company');
            var jobNameEle = $('body > div.position-head > div > div.position-content-l > div > span');
            var publishTimeEle = $('body > div.position-head > div > div.position-content-l > dd > p.publish_time');
            var salaryEle = $('body > div.position-head > div > div.position-content-l > dd > p:nth-child(1) > span.salary');
            var locationEle = $('#job_detail > dd.job-address.clearfix > input[type="hidden"]:nth-child(6)');
            var jobDescEle = $('#job_detail > dd.job_bt > div');
            var requireExpEle = $('body > div.position-head > div > div.position-content-l > dd > p:nth-child(1) > span:nth-child(3)');

            var recruitObj = {
                enterpriseName : companyEle.text(),
                startTime:publishTimeEle.text().match(TIMEFORMAT_REG)[0],
                jobTitle : jobNameEle.text(),
                salary : salaryEle.text(),
                location:locationEle.attr('value'),
                jobDesc:jobDescEle.text(),
                requireExp: requireExpEle.text(),
                languageType:language.toUpperCase()

            };
            logger.debug(recruitObj);
            var similarList = $('#jobs_similar_detail > ul li');
            var similarUrls = [];
            _.each(similarList,function(item){
                var $element = $(item);
                var jobId = $element.attr('data-jobid');
                similarUrls.push('https://www.lagou.com/jobs/'+jobId+'.html');
            });
            logger.trace(similarUrls);
            callback(null,{recruitObj:recruitObj,similarUrls:similarUrls})
        },
    };
    return model;
}