const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false}))

var router = express.Router();

app.get('/rain', (req, res)=>{
    res.send("hello rain, <img src='/rain.png'>");
});

router.route('/member/login').post((req,res)=>{
    fs.readFile('public/login.html', (err, data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
})

router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 페이지 호출');
})

app.use('/', router);
app.all('*', (req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})