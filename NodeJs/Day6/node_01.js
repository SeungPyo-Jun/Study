const express = require('express');
const bodyParser = require('body-parser');
// npm install morgan
const logger = require('morgan');
// npm install mongodb
let MongoClient = require('mongodb').MongoClient;

let app = express();
let port = 3000;
let router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));  // dev, short, common, combined
app.use('/', router);

let database;

function connectDB(){
    let databaseUrl = "mongodb://localhost:27017";
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

router.route('/member/login').post((req, res) => {
    // console.log("/member/login 호출");

    let paramUserid = req.body.userid;
    let paramUserpw = req.body.userpw;
    
    console.log("요청 파라미터 : " + paramUserid + ", " + paramUserpw);

    if(database){
        authUser(database, paramUserid, paramUserpw, (err, docs) => {
            if(err){
                console.log(err);
            }
            if(docs){
                console.dir(docs);
                let userId = docs[0].userid;
                let userPw = docs[0].pass;
                let userName = docs[0].name;

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write('<p>아이디 : ' + userId + '</p>');
                res.write('<p>비밀번호 : ' + userPw + '</p>');
                res.write('<p>이름 : ' + userName + '</p>');
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

router.route('/member/regist').post((req, res) => {
    let paramUserid = req.body.userid;
    let paramUserpw = req.body.userpw;
    let paramName = req.body.username;
    let paramAge = req.body.userage;

    console.log("요청 파라미터 : " + paramUserid + ", " + paramUserpw + ', ' + paramName + ', ' + paramAge);

    if(database){
        addUser(database, paramUserid, paramUserpw, paramName, paramAge, (err, result) => {
            if(err){
                console.log(err);
            }
            if(result.insertedCount > 0){
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 성공</h2>');
                res.write('<p>회원가입이 성공적으로 되었습니다.</p>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>회원가입에 실패했습니다.</p>');
                res.end();
            }
        });
    }

});

router.route('/member/edit').post((req, res) => {
    let paramUserid = req.body.userid;
    let paramUserpw = req.body.userpw;
    let paramName = req.body.username;
    let paramAge = req.body.userage;

    console.log("요청 파라미터 : " + paramUserid + ", " + paramUserpw + ', ' + paramName + ', ' + paramAge);

    if(database){
        editUser(database, paramUserid, paramUserpw, paramName, paramAge, (err, result) => {
            if(err){
                console.log(err);
            }
            if(result.modifiedCount > 0){
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>정보수정 성공</h2>');
                res.write('<p>정보수정이 성공적으로 되었습니다.</p>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>정보수정 실패</h2>');
                res.write('<p>정보수정에 실패했습니다.</p>');
                res.end();
            }
        });
    }
});

app.listen(port, () => {
    console.log("Server listening on port : " + port);
    connectDB();
});

let authUser = (database, userid, pw, callback) => {
    console.log("authUser 호출! : " + userid + ", " + pw);
    // member 컬렉션 참조
    let users = database.collection('member');
    users.find({"userid":userid, "pass":pw}).toArray((err, docs)=>{
        if(err){
            console.log("데이터 전송 실패!");
            callback(err, null);
            return;
        }
        if(docs.length > 0){
            console.log("데이터를 찾았습니다.");
            callback(null, docs)
        }else{
            console.log("데이터가 없습니다.");
            callback(null, null);
        }
    });
}

let addUser = function(database, paramUserid, paramUserpw, paramName, paramAge, callback){
    console.log('addUser 호출');
    let users = database.collection('member');

    users.insertMany([{userid:paramUserid, pass:paramUserpw, name:paramName, age:paramAge}], (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }
        if(result.insertedCount > 0){
            console.log('사용자 document 추가 : ' + result.insertedCount);
        }else{
            console.log('사용자 document 추가되지 않음');
        }
        callback(null, result);
    });
}

let editUser = function(database, paramUserid, paramUserpw, paramName, paramAge, callback){

    let users = database.collection('member');

    users.updateOne({userid:paramUserid}, {$set:{userid:paramUserid, pass:paramUserpw, name:paramName, age:paramAge}}, (err, result) => {
        if(err){
            callback(err, null);
            return;
        }
        if(result.modifiedCount > 0){
            console.log('사용자 document 수정됨 : ' + result.modifiedCount);
        }else{
            console.log('수정된 document가 없음');
        }
        callback(null, result);
    });
}