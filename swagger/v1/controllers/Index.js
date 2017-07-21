'use strict';

var url = require('url');

var Index = require('./IndexService');

module.exports.getIndex = function getIndex (req, res, next) {
  Index.getIndex(req.swagger.params, req, res, next);
};

module.exports.getContact = function getContact (req, res, next) {
    Index.getContact(req.swagger.params, res, next);
};

module.exports.getLife = function getLife (req, res, next) {
    Index.getLife(req.swagger.params, res, next);
};

module.exports.getLogin = function getLogin (req, res, next) {
    Index.getLogin(req.swagger.params, res, next);
};

module.exports.getSkill = function getSkill (req, res, next) {
    Index.getSkill(req.swagger.params, res, next);
};