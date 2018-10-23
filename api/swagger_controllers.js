'use strict';

const Todo = require('../controllers/Todo.js');

module.exports.getTodoById = function (req, res, next) {
    Todo.getTodoById(req.swagger.params, res, next);
};

module.exports.addTodo = function (req, res, next) {
    Todo.addTodo(req.swagger.params, res, next);
};

module.exports.deleteTodoById = function (req, res, next) {
    Todo.deleteTodoById(req.swagger.params, res, next);
};

module.exports.updateTodoById = function (req, res, next) {
    Todo.updateTodoById(req.swagger.params, res, next);
};

