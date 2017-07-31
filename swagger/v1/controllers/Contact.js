'use strict';

var url = require('url');

var Contact = require('./ContactService');

module.exports.sendContactMail = function sendContactMail (req, res, next) {
  Contact.sendContactMail(req.swagger.params, req, res, next);
};
