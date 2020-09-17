process.on('exit', function(){
    console.log('안녕히가세요!');
});

process.on('uncaughtException', function(err){
    console.log('예외가 발생했습니다.');
});

let count = 0;
let id = setInterval(function(){
    count++;
    if(count == 5){
        clearInterval(id);
    }
    error.error.error(); // 강제로 예외상황을 발생시키는 메소드
}, 3000);