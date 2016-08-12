var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

//var database;
var auth = require('./controllers/auth');
var message = require('./controllers/message');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/message', message.get);

app.post('/api/message', message.post);

app.post('/auth/register', auth.register);

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("We are connected to mongo");
        //database = db;
        //getMessages();
    }
});

var server = app.listen(5000, function() {
    console.log("listening on port ", server.address().port);
});

function getMessages(req, res)
{
    Message.find({}).exec(function(err, result) {
        res.send(result);
    });
}
