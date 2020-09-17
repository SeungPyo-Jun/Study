var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = require('./router/main01')(app, fs);

app.listen(port, () => {
    console.log("Server listening on port : " + port);
});


