const express = require('express');
const fs = require('fs');
// npm install jade
const jade = require('jade');

const app = express();
const port = 3000;

app.use((req, res) => {
    fs.readFile('jadetest2.jade', 'utf8', (err, data)=>{
        var fn = jade.compile(data);
        res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
        res.end(fn({
            name: "apple",
            desc: "착해요"
        }));
    });
});

app.listen(port, ()=>{
    console.log("Server linstening on port : " + port);
});