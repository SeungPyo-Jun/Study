let fs = require("fs");
let text = fs.readFileSync("test1.txt", "utf-8");
console.log(text);

fs.readFile("test1.txt", "utf-8", function(err, data){
    if(err) {
        console.log("error");
    }else{
        console.log(data);
    }
});