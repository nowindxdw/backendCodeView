'use strict';

var url = require('url');

var Menu = require('./MenuService');

module.exports.delMenudetail = function delMenudetail (req, res, next) {
  Menu.delMenudetail(req.swagger.params, res, next);
};

module.exports.editMenudetail = function editMenudetail (req, res, next) {
  Menu.editMenudetail(req.swagger.params, res, next);
};

module.exports.getMenuList = function getMenuList (req, res, next) {
  Menu.getMenuList(req.swagger.params, res, next);
};

module.exports.getMenudetail = function getMenudetail (req, res, next) {
  Menu.getMenudetail(req.swagger.params, res, next);
};

module.exports.postMenudetail = function postMenudetail (req, res, next) {
  Menu.postMenudetail(req.swagger.params, res, next);
};
