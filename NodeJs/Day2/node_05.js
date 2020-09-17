const express = require('express');
const app = express();
const port = 3000;

// localhost:3000/?userid=apple
app.use((req, res)=>{
    console.log("첫번째 미들웨어 실행");
    
    var userAgent = req.header('User-Agent');
    console.log(userAgent);
    var paramName = req.query.userid; // get 방식
    console.log(paramName);

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>익스프레스 서버에서 응답한 메세지입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>paramName : ' + paramName + '</p></div>');
    res.end();
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})