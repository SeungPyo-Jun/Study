const express = require('express');
const bodyParser = require('body-parser');
// npm install mongoose
const mongoose = require('mongoose');
const logger = require('morgan');

let port = 3000;
let app = express();
let router = express.Router();
let database;
let UserSchema;
let UserModel;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

function connectDB(){
    let Url = "mongodb://localhost:27017/nodedb";
    console.log('데이터베이스 연결 시도 ...');

    mongoose.Promise = global.Promise; // 몽구스의 프로미스 객체는 global의 프로미스 객체로 사용
    mongoose.connect(Url, { useNewUrlParser: true, useUnifiedTopology: true});
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', () => {
        console.log('데이터베이스 연결 성공!');

        UserSchema = mongoose.Schema({
            userid: String,
            userpw: String,
            name: String,
            gender: String
        });
        console.log('UserSchema 생성 완료!');

        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
        });

        UserModel = mongoose.model('users', UserSchema);
        console.log('UserModel이 정의 되었습니다.');
    });
}

router.route('/users/regist').post((req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let name = req.body.name;
    let gender = req.body.gender;

    console.log("요청 파라미터 : " + userid + ", " + userpw + ", " + name + ", " + gender);

    if(database){
        addUser(database, userid, userpw, name, gender, (err, result) => {
            if(err){
                console.log(err);
            }
            if(result){
                console.log('회원가입 성공');
            }else{
                console.log('회원가입 실패');
            }
        });
    }
});

router.route('/users/login').post((req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    console.log('요청 파라미터 : ' + userid + ", " + userpw);

    if(database){
        loginUser(database, userid, userpw, (err, docs) => {
            if(err) {
                console.log(err);
            }
            if(docs){
                console.dir(docs);
                let name = docs[0].name;
                let gender = docs[0].gender;

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write('<p>아이디 : ' + userid + '</p>');
                res.write('<p>비밀번호 : ' + userpw + '</p>');
                res.write('<p>이름 : ' + name + '</p>');
                res.write('<p>성별 : ' + gender + '</p>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                res.end();
            }
        });
    }
});

router.route('/users/list').get((req, res) => {
    if(database){
        UserModel.findAll((err, result) => {
            if(err){
                console.log('리스트 조회 실패');
            }
            if(result){
                res.writeHead('200',{'Content-Type':'text/html; charset=utf8'});
                res.write('<h2>회원 리스트</h2>');
                res.write('<div><ul>');
                for(let i=0; i<result.length; i++){
                    let userid = result[i]._doc.userid;
                    let name = result[i]._doc.name;
                    let gender = result[i]._doc.gender;
                    res.write("<li>" + i + " : " + userid + ", " + name + ", " + gender + "</li>");
                }
                res.write("</ul></div>");
                res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html; charset=utf8'});
                res.write('<h2>회원 리스트</h2>');
                res.write('<p>회원 리스트가 없습니다.</p>');
                res.end();
            }
        });
    }
});


let addUser = function(database, userid, userpw, name, gender, callback){
    console.log('addUser 호출');
    let users = new UserModel({userid:userid, userpw:userpw, name:name, gender:gender});

    users.save((err, result) => {
        if(err){
            callback(err, null);
            return;
        }
        console.log('회원 document 추가');
        callback(null, result);3
    });
};

let loginUser = function(database, userid, userpw, callback){
    console.log('loginUser 호출 : ' + userid + ', ' + userpw);

    UserModel.find({userid:userid, userpw:userpw}, (err, result) => {
        if(err){
            callback(err, null);
            return;
        }
        if(result.length > 0){
            console.log('일치하는 사용자를 찾음');
            callback(null, result);
        }else{
            console.log('일치하는 사용자 없음');
            callback(null, null);
        }
    });
};

app.listen(port, () => {
    console.log('Server listening on port : ' +  port);
    connectDB();
});