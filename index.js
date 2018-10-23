'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const spec = fs.readFileSync(path.join(__dirname, 'api', 'swagger.yaml'), 'utf8');

const serverPort = process.env.PORT || 3000;

app.set('port', serverPort);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// swaggerRouter configuration
const options = {
    controllers: './api',
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

const swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    app.use(middleware.swaggerValidator());
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    app.use(function(err, req, res, next) {
        if(err.statusCode){
            res.status(err.statusCode).send(err);
        } else {
            res.status(500).send('something broke!');
        }
    });

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    });
});

