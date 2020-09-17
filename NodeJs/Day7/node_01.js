const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const ejs = require('ejs');
const port = 3000;

let MongoClient = require('mongodb').MongoClient;
let app = express();
let router = express.Router();
let database;

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')))
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev'));
app.use('/', router);

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "_" + Date.now() + extension);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        file: 3,
        fileSize: 1024 * 1024 * 1024
    }
});

router.route('/mail/write').post(upload.array('photo', 1), (req, res) => {
    try{
        let files = req.files;
        console.log(req.files[0]);

        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;
        let userid = req.body.userid;
        let email = req.body.email;
        let title = req.body.title;
        let content = req.body.content;

        if(Array.isArray(files)){
            for(let i=0; i<files.length; i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }

        console.log("현재 파일 정보 : " + originalname + ", " + filename + ", " + mimetype + ", " + size);

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: 'ryuzy1011@gmail.com',
                pass: 'dp78!))#'
            },
            host: 'smtp.gmail.com',
            port: '465'
        });
        fs.readFile('uploads/' + filename, (err, data) => {
            if(err){
                console.log(err);
            }
            let mailOptions = {
                from: "류정원 <ryuzy1011@gmail.com>",
                to: email,
                subject: title,
                text: content,
                attachments: [{'filename':filename, 'content': data}]
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

        /*
            보안 수준이 낮은 앱의 액세스 : 보안 수준이 낮은 앱 허용 -> 사용
            https://myaccount.google.com/lesssecureapps

            계정 액세스 사용을 허용
            https://accounts.google.com/DisplayUnlockCaptcha

        */
        let sendmail = database.collection('sendmail');
        sendmail.insertMany([{userid:userid, email:email, title:title, content:content, filename:filename}], (err, result) => {
            if(err){
                console.log(err);
            }
            if(result.insertedCount > 0){
                console.log('사용자 document 추가 : ' + userid + ', ' + email + ', ' + title + ', ' + content + ', ' + filename);
            }else{
                console.log('사용자 document 추가되지 않음');
            }
        });

        let value = {userid:userid, email:email, title:title, content:content, filename:filename };
        fs.readFile('public/mail.ejs', 'utf8', (err, data) => {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(ejs.render(data, value));
        });
    }catch(e){
        console.log(e);
    }
});

function connectDB(){
    let databaseUrl = 'mongodb://localhost:27017';
    MongoClient.connect(databaseUrl, (err, db) => {
        if(err){
            console.log(err);
        }else{
            let tempdb = db.db('nodedb');
            database = tempdb;
            console.log('데이터베이스 연결 성공!');
        }
    });
}

app.listen(port, () => {
    console.log('Server listening on port : ' + port);
    connectDB();
});
