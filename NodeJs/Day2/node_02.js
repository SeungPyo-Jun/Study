const express = require('express');
const app = express();
const port = 3000;

/*
    1XX : 사용자 처리에 따른 에러
    2XX : 정상적인 페이지 호출
    4XX : 페이지 에러
    5XX : 서버 에러
*/
// app.get('/', (req, res) => {
//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.end('<h1>익스프레스 서버에서 응답한 메세지입니다.<h1>');
// });

app.use((req, res)=>{
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>익스프레스 서버에서 응답한 메세지입니다.!!<h1>');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})