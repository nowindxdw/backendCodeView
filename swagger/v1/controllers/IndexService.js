'use strict';

exports.getIndex = function(args, res, next) {
  /**
   * 主页接口
   * 展示默认主页接口
   *
   * no response value expected for this operation
   **/
   let data = {
       "user":"dawei"
   };
   res.render('index_sample.ejs',{data:data})
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

