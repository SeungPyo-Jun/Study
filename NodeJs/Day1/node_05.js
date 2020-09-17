let fs = require('fs');

try{
    let text = fs.readFileSync("test10.txt", "utf-8");
    console.log(text);
}catch(e){
    console.log(e);
}

// 비동기는 예외처리를 할 필요가 없습니다.
fs.readFile("test1.txt", "utf-8", function(err, data){
    if(err) {
        console.log("error");
    }else{
        console.log(data);
    }
});

try{
    fs.writeFileSync('test4.txt', 'writeFileSync()!', 'utf-8');
    console.log('success!!');
}catch(e){
    console.log(e);
}

fs.writeFile('test5.txt', 'writeFile()!', 'utf-8', function(err){
    if(err){
        console.log('error!!');
    }else{
        console.log('success!! : writeFile()');
    }
});
