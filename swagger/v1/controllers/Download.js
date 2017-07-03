'use strict';

var url = require('url');

var Download = require('./DownloadService');

module.exports.exportFile = function exportFile (req, res, next) {
  Download.exportFile(req.swagger.params, res, next);
};
