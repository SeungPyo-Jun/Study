process.on('exit', function(){
    console.log('안녕히계세요');
});

process.emit("exit");   // emit()로 발생시킨 exit는 실제로 프로그램이 종료는 안됩니다.
process.emit("exit");
process.emit("exit");

process.exit();     // 실제 프로그램 종료
console.log('프로그램을 종료합니다.');
