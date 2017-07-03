'use strict';

var url = require('url');

var Recruit = require('./RecruitService');

module.exports.pullRecruitList = function pullRecruitList (req, res, next) {
  Recruit.pullRecruitList(req.swagger.params, res, next);
};
