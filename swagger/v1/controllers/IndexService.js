'use strict';
const regTest = require('../../../models/regTest')();
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
exports.getIndex = function(args, res, next) {
  /**
   * 主页接口
   * 展示默认主页接口
   *
   * no response value expected for this operation
   **/
   let lang = args.pageLang.value;
   let style = args.pageStyle.value;
   logger.debug("enter info getIndex lang="+lang+",style="+style);
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
   let header = Header[lang];
   let menubar = Menubar[lang];
   let content = Content[lang];
   let footer = Footer[lang];
   res.render(style+'/'+'index.ejs',{header:header,menubar:menubar,content:content,footer:footer})
}

exports.getLogin = function(args, res, next) {
  /**
   * 主页登录接口
   * 根据用户名&密码去验证用户,确认密码与用户名无误后,将会返回用户的jwt信息
   *
   * no response value expected for this operation
   **/
  res.end();
}

