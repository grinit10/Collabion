'use strict';
var express = require('express');
//Morgan package for running server.js
var morgan = require('morgan');
//Mongoose to connect to mongodb
var mongoose = require('mongoose');
var http = require('http');
//Bodyparser to pase json data from request body
var bodyparser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
//Setting up the router for api
var router = express.Router();
//Binding the route object to api js
var appRoutes = require('./app/routes/api')(router);
var path = require("path");

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({exterded:true}));
app.use(express.static(__dirname + '/public'));
app.use("/api", appRoutes);


app.listen(port, function () {
    console.log("Running the server at port:" + port);
});

app.get("*", function (req, resp) {
    resp.sendfile(path.join(__dirname + "/public/app/views/index.html"));
});

mongoose.connect('mongodb://localhost:27017/tutorial', function (err) {
    if (err)
        console.log("Not connected to mongo server")
    else
        console.log("Connected to mongo server")
});