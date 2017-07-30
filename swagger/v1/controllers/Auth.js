'use strict';

var url = require('url');


var Auth = require('./AuthService');


module.exports.deleteAuth = function deleteAuth (req, res, next) {
  Auth.deleteAuth(req.swagger.params,req, res, next);
};

module.exports.postAuth = function postAuth (req, res, next) {
  Auth.postAuth(req.swagger.params, req, res, next);
};


module.exports.getLogin = function getLogin (req, res, next) {
    Auth.getLogin(req.swagger.params, req, res, next);
};
