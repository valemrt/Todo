# TODO

### Status
[![Build Status](https://travis-ci.org/valemrt/Todo.png)](https://travis-ci.org/valemrt/Todo)

This repo contains a Node.js server exposing some TODO APIs, once you run the server you can find the doc at `server:port/docs`.

Todos are stored into ElasticSearch and user can add, get, delete and update them.


#### How to run locally
**Prerequisite**
* ElasticSearch running on `http://127.0.0.1:9200/` 

(TIP: I've made some scripts to use a dockerized version of ES also for tests in Travis, if you want to use it simply run the script `setup_test_env.sh` under the scripts folder).


**Steps**

* Clone the repository (or update if you cloned before --- `git pull`)
* `npm install` if necessary (or `npm update` to update packages)
* `npm start`

#### How to run test automation
* `npm install`
* `npm install mocha -g`
* `npm test`

### Some notes
I'm totally aware that this app is buggy and not completed and it's far away from a production-like one.
I've written it in a very short time (one after-work evening), so there are still things missing but that I have pretty clear in my mind, such as:

* Authentication:  At the moment (October 24) there's no auth implementation, 
I've put something into the Swagger assuming there is an endpoint where user authenticates and gets a Token to consume APIs.
From the Token can be retrieved a unique `account_id` for each user and that can be used to retrieve to each user its TODOS.
I've made a [small diagram](https://github.com/valemrt/Todo/blob/master/Auth.jpg) explaining this. 

* Filtering: I've used `elasticsearch-helper` node module as it looked a quick solution, a next step would have a filtered search API where users could search based for instance on the TODO status (completed or not).

* Checks and Handlers: Because of lack of time I missed very important checks like input validation on API, I could have used a schema...errors handling as well is a total mess I should fix.

* UI: I confess, I'm not a frontend ninja, that's also why I've decided to use Swagger :)

* Travis: apart from the server code I've tried to make a 360° app adding some tests and scripts to automate things...of course is only a starting point.
 I got some networking issues on Travis environment when curling the dockerized ES but I had no time to investigate so sorry about that. 

 
 
Thanks for reading and again, sorry for this currently low level project, it was the best I could do in very short time.

I'll try to keep updating it adding the missing stuff and enriching it with features.
