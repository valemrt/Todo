'use strict';

const es = require('../helpers/es');
const utils = require('../helpers/utils');

function getTodoById (args, res, next) {
    console.log('getting todo with id: ', args.id.value);
    es.getTodo(args.id.value)
        .then((todo) => {
            res.setHeader('Content-Type', 'application/json');
            res.status = 200;
            res.end(todo);
        })
        .catch((error) => {
            let msg ='error getting todo';

            if(error === 'not found') {
                res.statusCode = 404;
                msg = error;
                res.end(msg);
            }
            if (error.status) { res.statusCode = error.status; }
            if(error.message) { msg = error.message; }

            res.end(msg);
        })
}

function addTodo (args, res, next) {
    if (!utils.isEmptyObject(args.todo.value)) {
        console.log('adding todo: ', args.todo.value);
        es.insertTodo(args.todo.value)
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.status = 200;
                res.end(JSON.stringify(result));
            })
            .catch((error) => {
                let msg = 'error adding todo';
                if(error.status) res.status = error.status;
                if(error.message) msg = error.message;

                res.end(msg);
            })
    } else {
        res.status(400).send('Enter a valid TODO');
    }

}

function deleteTodoById (args, res, next) {
    console.log('deleting todo with id: ', args.id.value);
    es.deleteTodo(args.id.value)
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.status = 200;
            res.end(JSON.stringify(result));
        })
        .catch((error) => {
            let msg = 'error deleting todo';
            if(error.status) res.statusCode = error.status;
            if(error.message) msg = error.message;

            res.end(msg);
        })
}

function updateTodoById (args, res, next) {
    if(!utils.isEmptyObject(args.updated_todo.value)) {
        console.log('updating todo with id: ', args.id.value);
        es.updateTodo(args.id.value, args.updated_todo.value)
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            })
            .catch((error) => {
                let msg = 'error updating todo';
                if(error.status) res.statusCode = error.status;
                if(error.message) msg = error.message;

                res.end(msg);
            })
    } else {
        res.status(400).send('Enter a valid TODO');
    }

}

module.exports = {
    getTodoById: getTodoById,
    deleteTodoById: deleteTodoById,
    updateTodoById: updateTodoById,
    addTodo: addTodo
};