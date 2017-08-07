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
var logger = new Logger(__logConfig);
var moment = require('moment');
var snowflakeId = require('snowflakeid-romens').getSnowflakeIDFactory(function(){});
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
        startGBKUrl: function (trackList, callback) {
            var urls = trackList;
            var ep = new eventproxy();
            ep.after("eventName", urls.length, function (urlResults) {
                callback(null, urlResults);
            });
            require('superagent-charset')(superagent)
            urls.forEach(function (url) {
                superagent.get(url)
                    .charset('gbk')
                    .end(function (err, urlRes) {
                        ep.emit("eventName", [url, urlRes.text])
                    });
            });
        },

        translateCDNews: function (data, callback) {
            // logger.trace(data);
            var url = data[0];
            logger.trace(url);
            var $ = cheerio.load(data[1]);
            //通过jquery方式获取内容链接
            var topnewsEle =$('body > div:nth-child(34) > div.w380.l > div.top-news');
            var topNews=[];
            // console.log(topnewsEle);
            topnewsEle.each(function(idx,element){
                var $element = $(element).children('h1').first();
                var title = $element.text();  //标题
                var href = $element.children('a').attr('href');//链接
                topNews.push({
                    title:title,
                    href:href
                })
            });
            // logger.debug(topNews);
            callback(null,topNews)
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
            var startTime = publishTimeEle.text().match(TIMEFORMAT_REG);
            logger.trace(jobNameEle.text());
            if(_.isNull(startTime)){
                startTime = moment().format("YYYY-MM-DD HH:mm:ss");
            }else{
                startTime = publishTimeEle.text().match(TIMEFORMAT_REG)[0];
            }
            var recruitObj = {};
            if(!_.isEmpty(jobNameEle.text())){
                recruitObj={
                    recruitSfId : snowflakeId.next().toString(),
                    enterpriseName : companyEle.text(),
                    startTime:startTime,
                    jobTitle : jobNameEle.text(),
                    salary : salaryEle.text(),
                    location:locationEle.attr('value'),
                    jobDesc:jobDescEle.text(),
                    requireExp: requireExpEle.text(),
                    languageType:language.toUpperCase(),
                    createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
                    updatedAt:moment().format("YYYY-MM-DD HH:mm:ss")
                };
                logger.debug(recruitObj);
            }
            callback(null,{recruitObj:recruitObj})
        },

        translateBaiduTops: function (data, callback) {
            logger.trace('enter into translateWeiboTops');
            var url = data[0];
            logger.trace(url);
            var $ = cheerio.load(data[1]);
            var baiduTops = [];
            var hotTops = $('#main > div.mainBody > div > table > tbody').find('.num-top');
            hotTops.each(function(idx,element){
                var $element = $(element);
                var topItem = {
                    text:$element.closest('tr').find('a').first().text(),
                    href:$element.closest('tr').find('a').first().attr('href')
                };
                baiduTops.push(topItem);
            });
            // logger.trace(baiduTops);
            callback(null, baiduTops);
        },

        translateMoviePiaofang:function(data,callback){
            logger.trace('enter into translateMoviePiaofang');
            var url = data[0];
            logger.trace(url);
            var $ = cheerio.load(data[1]);
            var moveList = [];
            var list = $('#box_office_live_summary > div > table > tbody > tr');
            list.each(function(idx,element){
                var $element = $(element);
                var data = $element.find('td');
                var dataList=[];
                data.each(function(idx,dataItem){
                    var $dataItem = $(dataItem);
                    dataList.push($dataItem.text());
                })

                moveList.push({
                    name:dataList[0],
                    totalPercent:dataList[1],
                    online:dataList[2],
                    realtime:dataList[4],
                    total:dataList[5]
                });
            });
            // logger.trace(moveList);
            moveList=moveList.slice(0,-1);
            callback(null, moveList);
        },
    };
    return model;
}
