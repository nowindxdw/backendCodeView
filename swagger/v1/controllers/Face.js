'use strict';

var url = require('url');

var Face = require('./FaceService');

module.exports.getFacePlusPlus = function getFacePlusPlus (req, res, next) {
  Face.getFacePlusPlus(req.swagger.params, res, next);
};

module.exports.postFacePlusPlus = function postFacePlusPlus (req, res, next) {
  Face.postFacePlusPlus(req.swagger.params, res, next);
};
