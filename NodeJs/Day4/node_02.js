let express = require('express');
// npm install cookie-parser
let cookieParser = require('cookie-parser');

var app = express();
var port = 3000;

app.use(cookieParser());

app.get('/setCookie', (req, res) => {
    console.log('setCookie 호출');
    res.cookie('member', {
        id: 'apple',
        name: '김사과',
        gender: 'female'
    }, 
    {
        maxAge: 1000*60*60
    });
    res.redirect('/showCookie');
});

app.get('/showCookie', (req, res) => {
    console.log('showCookie 호출');
    res.send(req.cookies);
    res.end();
});

app.listen(port, () => {
    console.log("Server listening on port : " + port);
});
