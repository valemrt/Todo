'use strict';
/**
var app = require("../").app;
var server = require("../").server;
var request = require("supertest").agent(server);
*/

const should = require('should');
const index = require('../index');
const server = index.app;
const request = require('supertest');
const srv = index.srv;


let todo = {
    "todo_id": 555,
    "todo": "test",
    "datecreated": "2018-10-23T18:39:11.295Z",
    "author": "tester",
    "duedate": "2018-10-23T18:39:11.295Z",
    "completed": true
};
/**
after(function() {
    server.close();
}); */

describe('API', function(){
    after( function() {
        srv.close();
    });

    describe('POST /', function() {
        it('adding a valid Todo', function(done) {
            request(server)
                .post('/v1/')
                .set('Accept', 'application/json')
                .send(todo)
                .expect(200)
                .end(function(err, res) {
                    if(err){
                        return done(err)
                    }
                    //should.not.exist(err);
                    res.body.should.eql({
                        "status": "success"
                    });

                    done();
                });
        });

        it('adding empty TODO', function(done){
            request(server)
                .post('/v1/')
                .set('Accept', 'application/json')
                .send({})
                .expect(400)
                .end(function(err, res) {
                    if(err){
                        return done(err)
                    }
                    //should.not.exist(err);
                    res.text.should.eql('Enter a valid TODO');

                    done();
                });
        });

    });

    describe('GET /todo/{id}', function() {
        it('get existing todo', function(done) {
            request(server)
                .get('/v1/todo/'+todo.todo_id)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }

                    res.body.should.eql(todo);

                    done();
                });
        });

        it('get NOT existing todo', function(done) {
            request(server)
                .get('/v1/todo/'+77777)
                .set('Accept', 'application/json')
                .expect(404)
                .end(function(err, res) {
                    if(err){
                        return done(err);
                    }

                    res.text.should.eql('not found');

                    done();
                });
        });
    });

    describe('PUT /todo/{id}', function() {
        it('Editing a Todo', function(done) {
            todo.todo = 'NEWWW';
            request(server)
                .post('/v1/')
                .set('Accept', 'application/json')
                .send(todo)
                .expect(200)
                .end(function(err, res) {
                    if(err){
                        return done(err)
                    }
                    //should.not.exist(err);
                    res.body.should.eql({
                        "status": "success"
                    });

                    done();
                });
        });
    });

    describe('DELETE /todo/{id}', function() {
        it('Deliting existing todo', function(done){
            request(server)
                .delete('/v1/todo/'+todo.todo_id)
                .expect(200)
                .end(function(err, res) {
                    if(err){
                        return done(err);
                    }

                    res.body.should.eql({
                        "status": "success"
                    });

                    done();
                });
        });

        it('Deliting existing todo', function(done) {
            request(server)
                .delete('/v1/todo/'+987)
                .expect(404)
                .end(function(err, res) {
                    should.not.exist(err);

                    res.text.should.eql('Not Found');

                    done();
                });
        });

    });
});




