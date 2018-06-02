var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = require('./routes');

const config = require('./config/database');

mongoose.connect(config.database);

// db connection status
mongoose.connection
    .on('connected', () => {
        console.log('connected to database : ' + config.database);        
    })
    .on('error', (error) => {
        console.log('error on connecting to database: ' + error);        
    });


var app = express();

// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', router);

app.listen(port, function() {
    console.log('server is running on port : ' + port);    
});