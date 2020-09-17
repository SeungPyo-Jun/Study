const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

var header = fs.readFileSync('header.ejs', 'utf8');
var content = fs.readFileSync('content.ejs', 'utf8');

app.use((req, res) => {
    var html = ejs.render(header, {title:'제목입니다.', content: ejs.render(content, { message: "텍스트 메세지"})});
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
});

app.listen(port, ()=>{
    console.log("Server linstening on port : " + port);
});