'use strict';

var url = require('url');

var Msg = require('./MsgService');

module.exports.delMsgdetail = function delMsgdetail (req, res, next) {
  Msg.delMsgdetail(req.swagger.params, res, next);
};

module.exports.editMsgdetail = function editMsgdetail (req, res, next) {
  Msg.editMsgdetail(req.swagger.params, res, next);
};

module.exports.getMsgList = function getMsgList (req, res, next) {
  Msg.getMsgList(req.swagger.params, res, next);
};

module.exports.getMsgdetail = function getMsgdetail (req, res, next) {
  Msg.getMsgdetail(req.swagger.params, res, next);
};

module.exports.postMsgdetail = function postMsgdetail (req, res, next) {
  Msg.postMsgdetail(req.swagger.params, res, next);
};
