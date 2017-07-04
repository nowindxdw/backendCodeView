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
module.exports = function () {
    var model = {

        /**
         * 并发抓取原始网页数据
         * @param trackList
         * @param callback
         */
        start:function(trackList,callback){
            var urls =_.map(trackList,"trackUrl");
            var ep = new eventproxy();
            ep.after("eventName",urls.length,function(urlResults){
                callback(null,urlResults);
            });
            urls.forEach(function(url){
                superagent.get(url)
                    .end(function(err,urlRes){
                        ep.emit("eventName",[url,urlRes.text])
                    });
            });
        },
        /**
         * 根据业务翻译抓取内容存到数据库
         * @param db
         * @param data
         */
        translateRecruit:function(db,data){

        }
    };
    return model;
}