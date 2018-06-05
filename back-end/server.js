var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var bookrouter = require('./routers/bookRoutes');

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

// Middleware
// parse application/x-www-form-urlencoded: use x-www-form-urlencoded for parsing data
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());


// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

app.use('/api', bookrouter);

app.listen(port, function() {
    console.log('server is running on port : ' + port);    
});