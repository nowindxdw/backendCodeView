'use strict';
const regTest = require('../../../models/regTest')();
const Utils = require('../../../models/Utils');
const Logger = require('logger-romens');
const moment = require('moment');
const async = require('async');
let   logger = new Logger(__logConfig);
exports.getIndex = function(args, req, res, next) {
  /**
   * 主页接口
   * 展示默认主页接口
   *
   * no response value expected for this operation
   **/
   let ip = Utils.getReqInfo(req).ip;
   // logger.debug("ip",ip);
   let lang = args.pageLang.value;
   let style = args.pageStyle.value;
   // logger.debug("enter info getIndex lang="+lang+",style="+style);
   logger.info("ip="+ip+"enter info getIndex lang="+lang+",style="+style);
   //数据校验
   if (!regTest.testLang(lang)) {
      lang = __localConfig;
   }
   if (!regTest.testStyle(style)) {
      style = "nightsky";
   }
   logger.trace(lang);
   const Header = require("../../../local/local").header;
   const Menubar = require("../../../local/local").menubar;
   const Content = require("../../../local/local").maincontent;
   const Footer = require("../../../local/local").footer;
   const TodayNews = require("../../../local/local").todayNews;
   let header = Header[lang];
   let menubar = Menubar[lang];
   let content = Content[lang];
   let footer = Footer[lang];
   let todays = TodayNews[lang];
   let limitTailNum = Utils.getLimitTailNum();
   todays.limitTailNum = limitTailNum;
   async.parallel({
       getTodayWeather: function (done) {
           Utils.getTodayWeather(ip, function (err, weatherData) {
               if (err) {
                   todays.weatherData = moment().format('YYYY-MM-DD') + ":NO DATA(暂无数据)";
               } else {
                   todays.weatherData = weatherData;
               }
               done();
           })
       },
       getTodayCDNews: function (done) {
           Utils.getTodayCDNews(function (err, newsData) {
               if (err) {
                   todays.newsData = "NO DATA（暂无数据）";
               } else {
                   todays.newsData = newsData;
               }
               done();
           })
       },
       getTodayHotBaidu: function (done) {
           Utils.getTodayHotBaidu(function (err, baiduHots) {
               if (err) {
                   todays.baiduHots = "NO DATA（暂无数据）";
               } else {
                   todays.baiduHots = baiduHots;
               }
               done();
           })
       },
       getTodayMovie: function (done) {
           Utils.getTodayMovie(function (err, movies) {
               if (err) {
                   todays.movies = "NO DATA（暂无数据）";
               } else {
                   todays.movies = movies;
               }
               done();
           })
       },
   }, function(error,result) {
           res.render(style + '/' + 'index.ejs',
               {
                   header: header,
                   menubar: menubar,
                   content: content,
                   footer: footer,
                   todays: todays,
                   current: 'index'
               })
   })
}

exports.getContact = function(args, req, res, next) {
    /**
     * 主页联系方式接口
     * 展示主页联系方式页面
     *
     * pageLang String 页面语言 (optional)
     * pageStyle String 页面风格 (optional)
     * no response value expected for this operation
     **/
    let ip = Utils.getReqInfo(req).ip;
    // logger.debug("ip",ip);
    let lang = args.pageLang.value;
    let style = args.pageStyle.value;
    // logger.debug("enter info getContact lang="+lang+",style="+style);
    logger.info("ip="+ip+"enter info getContact lang="+lang+",style="+style);
    //数据校验
    if (!regTest.testLang(lang)) {
        lang = __localConfig;
    }
    if (!regTest.testStyle(style)) {
        style = "nightsky";
    }
    logger.trace(lang);
    const Header = require("../../../local/local").header;
    const Menubar = require("../../../local/local").menubar;
    const Content = require("../../../local/local").maincontent;
    const Footer = require("../../../local/local").footer;
    const Contact = require("../../../local/local").contactcontent;
    let header = Header[lang];
    let menubar = Menubar[lang];
    let content = Content[lang];
    let footer = Footer[lang];
    let contact = Contact[lang];
    res.render(style+'/'+'contact.ejs',
        {
            header:header,
            menubar:menubar,
            content:content,
            footer:footer,
            contact:contact,
            current:'contact'
        })

}

exports.getLife = function(args, res, next) {
    /**
     * 主页生活接口
     * 展示主页生活页面
     *
     * pageLang String 页面语言 (optional)
     * pageStyle String 页面风格 (optional)
     * no response value expected for this operation
     **/
    res.end();
}

exports.getSkill = function(args, req, res, next) {
    /**
     * 主页技艺接口
     * 展示主页技艺页面
     *
     * pageLang String 页面语言 (optional)
     * pageStyle String 页面风格 (optional)
     * no response value expected for this operation
     **/
    let ip = Utils.getReqInfo(req).ip;
    // logger.debug("ip",ip);
    let lang = args.pageLang.value;
    let style = args.pageStyle.value;
    // logger.debug("enter info getSkill lang="+lang+",style="+style);
    logger.info("ip="+ip+"enter info getSkill lang="+lang+",style="+style);
    //数据校验
    if (!regTest.testLang(lang)) {
        lang = __localConfig;
    }
    if (!regTest.testStyle(style)) {
        style = "nightsky";
    }
    logger.trace(lang);
    const Header = require("../../../local/local").header;
    const Menubar = require("../../../local/local").menubar;
    const Content = require("../../../local/local").maincontent;
    const Footer = require("../../../local/local").footer;
    const Skill = require("../../../local/local").skillcontent;
    let header = Header[lang];
    let menubar = Menubar[lang];
    let content = Content[lang];
    let footer = Footer[lang];
    let skill = Skill[lang];
    res.render(style+'/'+'skill.ejs',
        {
            header:header,
            menubar:menubar,
            content:content,
            footer:footer,
            skill:skill,
            current:'skill'
        })
}

