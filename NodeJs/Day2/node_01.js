// npm install express
const express = require('express');
const app = express(); // 생성자
const port = 3000;


// http://www.naver.com

app.get('/', (req, res) => {
    res.send('익스프레스 서버 시작!');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})