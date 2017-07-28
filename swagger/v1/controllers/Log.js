'use strict';

var url = require('url');

var Log = require('./LogService');

module.exports.getLogList = function getLogList (req, res, next) {
  Log.getLogList(req.swagger.params, res, next);
};

module.exports.getLogdetail = function getLogdetail (req, res, next) {
  Log.getLogdetail(req.swagger.params, res, next);
};
