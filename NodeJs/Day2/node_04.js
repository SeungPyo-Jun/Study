const express = require('express');
const app = express();
const port = 3000;

// 미들웨어에서 redirect 메소드를 사용
app.use((req, res)=>{
    console.log("첫번째 미들웨어 실행");
    res.redirect('https://www.google.com');
});

app.listen( port, ()=> {
    console.log("Server listening on port : " + port);
})