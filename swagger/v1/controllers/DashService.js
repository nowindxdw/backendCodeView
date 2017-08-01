'use strict';
const Logger = require('logger-romens');
let   logger = new Logger(__logConfig);
let   dashModel = require('./model/DashModel')();
exports.getDashboard = function(args, req, res, next) {
  /**
   * 后台默认页面渲染
   * 获取后台首页
   *
   * no response value expected for this operation
   **/
  logger.info("user ="+JSON.stringify(req.user)+"enter into Dashboard page");
  let user = req.user;
  let data = {};
  dashModel.getDashData(user,(err,result)=>{
    if(err){
      logger.error(err.stack);
    }else{
      logger.debug(result);
      data = result;
    }
    res.render('dashboard/index.ejs',{data:data});
  })

}

