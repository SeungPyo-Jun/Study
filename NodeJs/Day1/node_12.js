let http = require('http');
let fs = require('fs');

http.createServer(function(req, res){
    fs.readFile('test.html', function(err, data){
        if(!err){
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }else{
            console.log(err);
        }
    });
}).listen(3300, function(){
    console.log('서버 실행중 ...');
});