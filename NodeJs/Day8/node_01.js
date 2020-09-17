const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');
// npm install mysql
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'nodedb',
    debug: false
});

let app = express();
let port = 3000;
let router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use('/', router);

router.route('/member/regist').post((req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let name = req.body.name;
    let age = req.body.age;

    console.log('요청 파라미터 : ' + userid + ', ' + userpw + ', ' + name + ', ' + age);

    if(pool){
        addMember(userid, userpw, name, age, (err, result) => {
            if(err) {
                console.log(err);
            }
            if(result){
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 실패');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>DB연결 실패</h2>');
        res.end();
    }
});

router.route('/member/login').post((req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    
    console.log('요청 파라미터 : ' + userid + ', ' + userpw);

    if(pool){
        loginMember(userid, userpw, (err, result) => {
            if(err){
                console.log(err);
            }
            if(result){
                let name = result[0].NAME;
                let age = result[0].age;
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write('<p>아이디 : ' + userid + '</p>');
                res.write('<p>이름 : ' + name + '</p>');
                res.write('<p>나이 : ' + age + '</p>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.end();
            }
        });
    }
});

let addMember = function(userid, userpw, name, age, callback){
    console.log('addMember 호출');

    pool.getConnection((err, conn) => {
        if(err){
            if(conn){
                conn.release(); // 연결을 해제
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 성공');
        let sql = conn.query("insert into member(userid, userpw, name, age) values (?, ?, ?, ?)", [userid, userpw, name, age], (err, result) => {
            conn.release();
            console.log('정상적인 sql 실행');
            if(err){
                callback(err, null);
                return;
            }
            console.log('가입완료');
            callback(null, result);
        });
        
    });
}

let loginMember = function(userid, userpw, callback){
    console.log('loginMember 호출');

    pool.getConnection((err, conn) => {
        if(err){
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        let sql = conn.query('select * from member where userid=? and userpw=?', [userid, userpw], (err, result) => {
            conn.release();
            console.log("정상적인 sql 실행");
            if(result.length > 0){
                console.log('일치하는 사용자 찾음');
                callback(null, result);
            }else{
                console.log('일치하는 사용자 없음');
                callback(null, null);
            }
        });
    });
}


app.listen(port, () => {
    console.log('Server listening on port : ' + port);
});

