
'use strict';

const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const moment = require('moment');

module.exports = {
    /**
     * 获取请求者的ip，测试环境下默认请求四川成都电信ip
     * @param req
     * @returns {{ip: (string|T|*)}}
     */
    getReqInfo:function(req){
      var ip = req.ip && req.ip.split(':').pop();
      if(ip=="127.0.0.1"||"0.0.0.0"){
          ip = "125.71.135.3"//四川 成都 电信
      }
      return {
          ip:ip
      }
    },
    /**
     * 获取今日限行数据
     * @returns {*}
     */
    getLimitTailNum: function () {
        logger.trace('Enter into getLimitTailNum');
        var today = moment().format("YYYY-MM-DD");
        var weekdayNo = moment(today).weekday();
        var limitNumMap = {
            "1":"1,6",
            "2":"2,7",
            "3":"3,8",
            "4":"4,9",
            "5":"5,0,X",
            "6":"-",
            "7":"-",
        }
        return limitNumMap[weekdayNo];
    },
    /**
     * 获取今日气象数据
     * @param ip
     * @param callback
     */
    getTodayWeather: function(ip,callback){
        logger.trace('Enter into getTodayWeather');
        var api = require('../interfaces/baiduApi/api.js');
        var config = require("config");
        var ak = config.get("baiduAK");
        api.getIP(ip,ak,"",function(err,result){
            if(err){
                return callback(err);
            }
            if(result.status!=200){
                return callback("baidu api call err");
            }

            try{
                var resObj = JSON.parse(result.text);
                var cityName = resObj.content.address_detail.city;
            }catch(err){
                return callback(err)
            }
            // logger.debug(cityName);
            api.getWeather(cityName,ak,"json",function(err,result){
                if(err){
                    return callback(err);
                }
                if(result.status!=200){
                    return callback("baidu api call err");
                }
                try{
                    var weatherObj = JSON.parse(result.text);
                }catch(err){
                    return callback(err)
                }
                logger.debug(weatherObj);
                callback(null,weatherObj);
            })
        })
    },
    /**
     * 获取今日新闻数据（大成网）
     * @param callback
     */
    getTodayCDNews :function(callback){
        var scrapyModel = require('../models/scrapy')();
        var trackList = [
            "http://cd.qq.com/"//cd news
        ];
        scrapyModel.startGBKUrl(trackList,function(err,result){
            if(err){
                logger.error(err.stack);
                return callback(err);
            }
            scrapyModel.translateCDNews(result[0],function(err,result){
                if(err){
                    logger.error(err.stack);
                    return callback(err);
                }
                callback(null,result);
            })
        })
    }
};