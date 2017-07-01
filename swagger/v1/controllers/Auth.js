'use strict';

var url = require('url');


var Auth = require('./AuthService');


module.exports.deleteAuth = function deleteAuth (req, res, next) {
  Auth.deleteAuth(req,req.swagger.params, res, next);
};

module.exports.postAuth = function postAuth (req, res, next) {
  Auth.postAuth(req.swagger.params, res, next);
};
