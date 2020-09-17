const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use((req, res) => {
    var value = {userid:'apple', userpw:'1234'};
    fs.readFile('ejstest2.ejs', 'utf8', (err, data)=>{
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(ejs.render(data, value));
    });
});

app.listen(port, ()=>{
    console.log("Server linstening on port : " + port);
});