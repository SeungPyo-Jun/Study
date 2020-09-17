process.on('exit', function(){
    console.log('exit 이벤트 발생!');
});

setTimeout(function(){
    console.log('3초 후 시스템 종료');
    process.exit;
}, 3000);
// 3초 후에 1번째 매개변수에 있는 함수를 실행