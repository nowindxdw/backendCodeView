'use strict';

var url = require('url');

var Todo = require('./TodoService');

module.exports.delTododetail = function delTododetail (req, res, next) {
  Todo.delTododetail(req.swagger.params, res, next);
};

module.exports.editTododetail = function editTododetail (req, res, next) {
  Todo.editTododetail(req.swagger.params, res, next);
};

module.exports.getTodoList = function getTodoList (req, res, next) {
  Todo.getTodoList(req.swagger.params, res, next);
};

module.exports.getTododetail = function getTododetail (req, res, next) {
  Todo.getTododetail(req.swagger.params, res, next);
};

module.exports.postTododetail = function postTododetail (req, res, next) {
  Todo.postTododetail(req.swagger.params, res, next);
};
