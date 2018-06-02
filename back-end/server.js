var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

app.listen(port, function() {
    console.log('server is running on port : ' + port);    
});