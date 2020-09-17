let http = require('http');
let fs = require('fs');

http.createServer(function(req, res){
    fs.readFile('nodejs.png', function(err, data){
        if(!err){
            res.writeHead(200, {'content-type':'image/png'});
            res.end(data);
        }else{
            console.log(err);
        }
    });
}).listen(3400, function(){
    console.log('서버 실행중 ...');
});

http.createServer(function(req, res){
    fs.readFile('sun.mp3', function(err, data){
        if(!err){
            res.writeHead(200, {'content-type':'audio/mp3'});
            res.end(data);
        }else{
            console.log(err);
        }
    });
}).listen(3500, function(){
    console.log('서버 실행중 ...');
});