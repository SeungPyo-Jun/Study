const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/mail', (req, res) => {
    fs.readFile('public/mail.html', 'utf8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.post('/mailok', (req, res) => {
    //console.log(req.body);
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'ryuzy1011@gmail.com',
            pass: ''
        },
        host: 'smtp.mail.com',
        port: '465'
    });
    
    let mailOptions = {
        from : "류정원 <ryuzy1011@mail.com>",
        to : req.body.to,
        subject : req.body.title,
        text : req.body.content
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        transporter.close();
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
});

app.listen(port, () => {
    console.log("Server listening on port : " + port);
});