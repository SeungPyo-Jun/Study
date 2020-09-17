const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}))
app.use((req, res)=>{
    console.log("첫번째 미들웨어 실행");

    var paramId = req.body.userid;  // POST
    var paramPW = req.body.userpw;  // POST

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>익스프레스 서버에서 응답한 메세지입니다.</h1>');
    res.write('<div><p>아이디 : ' + paramId + '</p></div>');
    res.write('<div><p>비밀번호 : ' + paramPW + '</p></div>');
    res.end();
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})