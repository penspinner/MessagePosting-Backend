var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

//var database;
var Message = mongoose.model('Message', {
    msg: String
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/message', getMessages);

app.post('/api/message', function(req, res) {
    console.log(req.body);
    //database.collection('messages').insertOne(req.body);
    var message = new Message(req.body);
    message.save();

    res.status(200);
});

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
