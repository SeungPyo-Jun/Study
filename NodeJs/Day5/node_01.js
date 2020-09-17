const express = require('express');
const bodyParser = require('body-parser');

// npm install mongodb
let MongoClient = require('mongodb').MongoClient;

let app = express();
let port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

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

app.post('/member/login', (req, res) => {
    let paramUserid = req.body.userid;
    let paramUserpw = req.body.userpw;
    
    console.log("요청 파라미터 : " + paramUserid + ", " + paramUserpw);

    if(database){
        authUser(database, paramUserid, paramUserpw, (err, docs) => {

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
        }
        if(docs.length > 0){
            console.log("데이터를 찾았습니다.");
        }else{
            console.log("데이터가 없습니다.");
        }
    });
}