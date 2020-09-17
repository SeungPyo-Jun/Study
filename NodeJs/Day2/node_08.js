const express = require('express');
const fs = require('fs');
// npm install ejs
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use((req, res) => {
    fs.readFile('ejstest.ejs', 'utf8', (err, data)=>{
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(ejs.render(data)); // ejs 파일 형식을 HTML 파일 형식으로 랜더링
    });
});

app.listen(port, ()=>{
    console.log("Server linstening on port : " + port);
});