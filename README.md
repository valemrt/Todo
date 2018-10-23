# TODO

### Status
[![Build Status](https://travis-ci.org/valemrt/Todo.png)](https://travis-ci.org/valemrt/Todo)

This repo contains a Node.js server exposing some TODO APIs, once you run the server you can find the doc at `server:port/docs`.

#### How to run locally
**Prerequisite**
* ElasticSearch running on `http://127.0.0.1:9200/`


**Steps**

* Clone the repository (or update if you cloned before --- `git pull`)
* `npm install` if necessary (or `npm update` to update packages)
* `npm start`

#### How to run test automation
* `npm install`
* `npm install mocha -g`
* `npm test`