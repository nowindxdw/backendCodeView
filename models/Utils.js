
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
        logger.trace(weekdayNo) ;
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
    }
};