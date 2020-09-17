const express = require('express');
const bodyParser = require('body-parser');
// npm install serve-static
const static = require('serve-static');

const app = express();
const port = 3000;

// 현재 디렉토리로 public 폴더를 매핑
// localhost:3000/public/login.html -> localhost:3000/login.html
app.use(static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false}))

var router = express.Router();

router.route('/member/login').post((req,res)=>{
    var paramId = req.body.userid;
    var paramPW = req.body.userpw;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>익스프레스 서버에서 응답한 메세지입니다.</h1>');
    res.write('<div><p>아이디 : ' + paramId + '</p></div>');
    res.write('<div><p>비밀번호 : ' + paramPW + '</p></div>');
    res.end();
})

router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 페이지 호출');
})

app.use('/', router);
app.all('*', (req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})