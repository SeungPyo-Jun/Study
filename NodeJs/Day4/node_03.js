let express = require('express');
// npm install express-session
let expressSession = require('express-session');
let static = require('serve-static');
let path = require('path');

var app = express();
var port = 3000;

app.use('/public', static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: '!@#$%^&*()(',
    resave: false,
    saveUninitialized: true
}));

// localhost:3000/login?userid=apple&userpw=1111
app.get('/login', (req, res) => {
    let paramUserid = req.query.userid;
    let paramUserpw = req.query.userpw;

    if(req.session.member){
        console.log('이미 로그인 중입니다.');
        res.redirect('/main');
    }else{
        req.session.member = {
            userid: paramUserid,
            name: '',
            authorized: true
        };

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>세션이 생성되었습니다.</h2>');
        res.write('<p>아이디 : ' + paramUserid + '</p>');
        res.write('<p>비밀번호 : ' + paramUserpw + '</p>');
        res.write('<p><a href="/main">메인으로 이동</a></p>');
        res.end();
    }
});

app.use('/main', (req, res) => {
    if(req.session.member){
        res.redirect('./public/welcome.html');
    }else{
        res.redirect('./public/fail.html');
    }
});

app.listen(port, () => {
    console.log("Server listening on port : " + port);
});
