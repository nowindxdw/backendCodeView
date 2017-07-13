'use strict';
const Header = require("../../../local/local").header;
const regTest = require('../../../models/regTest')();
const Logger = require('logger-romens');
let   logger = new Logger();
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
   let header = Header[lang];
   res.render(style+'/'+'index.ejs',{header:header})
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

