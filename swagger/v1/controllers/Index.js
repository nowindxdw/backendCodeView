'use strict';

var url = require('url');

var Index = require('./IndexService');

module.exports.getIndex = function getIndex (req, res, next) {
  Index.getIndex(req.swagger.params, res, next);
};

module.exports.getLogin = function getLogin (req, res, next) {
  Index.getLogin(req.swagger.params, res, next);
};
