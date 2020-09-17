let http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'content-type':'text/html'});
    res.end("<!DOCTYPE html><html lang='ko'><head><meta charset='UTF-8'><title>Node.js</title></head><body><h2>Node.js로 만든 페이지입니다.</h2></body></html>");
}).listen(3000, function(){
    console.log('서버 실행중 ... ');
});