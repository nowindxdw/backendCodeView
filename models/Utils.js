
'use strict';

const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const moment = require('moment');

module.exports = {

    //任意sql语句
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

    getTodayWeather: function(callback){
        logger.trace('Enter into getTodayWeather');
        var api = require('../interfaces/baiduApi/api.js');
        var config = require("config");
        var ak = config.get("baiduAK");
        api.getIP("",ak,"",function(err,result){
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
    }

};