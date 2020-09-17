let fs = require('fs');
let data = "Hello Node.js !!!!";

fs.writeFile('test2.txt', data, 'utf-8', function(err){
    if(err){
        console.log('error!!');
    }else{
        console.log('success!! : writeFile()');
    }
});

fs.writeFileSync('test3.txt', data, 'utf-8');
console.log('success!! : writeFileSync() ');