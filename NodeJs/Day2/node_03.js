const express = require('express');
const app = express();
const port = 3000;

// 첫번째 미들웨어에서 다음 미들웨어로 값을 전달
app.use((req, res, next)=>{
    console.log("첫번째 미들웨어 실행");
    req.user = 'apple';
    next();
});

// 두번째 미들웨어에서 사용자에게 응답 전송
app.use('/', (req, res, next)=>{
    console.log("두번째 미들웨어 실행");
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>'+req.user+'<h1>');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})