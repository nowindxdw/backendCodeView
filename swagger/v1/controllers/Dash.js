'use strict';

var url = require('url');

var Dash = require('./DashService');

module.exports.getDashboard = function getDashboard (req, res, next) {
  Dash.getDashboard(req.swagger.params, req, res, next);
};
