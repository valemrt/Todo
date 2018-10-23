'use strict';

const ES = require("elasticsearch-helper");
const index = 'todo'; //index created on ES

// Will create a default client
ES.addClient("127.0.0.1:9200");

//create-overwrite
module.exports.insertTodo = function(todo) {
    return new Promise ((resolve, reject) => {
        ES.query(index,"_doc")
            .id(todo.todo_id)
            .body(todo) // Data object to store
            .run()
            .then(function(hit){
                console.log('success!');
                resolve({'status':'success'});
                // return the data object
            })
            .catch((err) => {console.log(err);reject(err)})
    });

};

module.exports.getTodo = function(id) {

    return new Promise((resolve, reject) => {
        ES.query(index,"_doc")
            .id(id)
            .run()
            .then(function(hit){
                // return hit object or false if not found
                if (hit === false) {
                    reject ('not found');
                } else {
                    resolve(JSON.stringify(hit.data()));
                }
            })
            .catch((err) => reject(err))
    })

};

module.exports.deleteTodo = function (id) {
    return new Promise((resolve, reject) => {
        ES.query(index,"_doc")
            .id(id)
            .delete()
            .then(function(hit){
                console.log('deleted!');
                resolve({'status':'success'});
            })
            .catch((err) => {reject(err)})
    })
};

module.exports.updateTodo = function (id, body) {
    return new Promise((resolve, reject) => {
        ES.query(index,"_doc")
            .id(id)
            .update(body) // Data object to update
            .run()
            .then(function(hit){
                console.log('update success');
                resolve({'status':'success'});
                // return the data object
            })
            .catch((err) => reject(err))
    })
};