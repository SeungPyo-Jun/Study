let events = require('events');
let eventEmitter = new events.EventEmitter(); // 이벤트 관련 메소드를 사용할 수 있도록 객체를 만듭니다.

let connectHandler = function connected(){  // connected() 실행
    console.log('연결 성공!');
    eventEmitter.emit('data_received'); // 4: data_received 이벤트 발생
}

eventEmitter.on("connection", connectHandler);  // 2: connection 이벤트 발생시 connectHandler 함수 호출

eventEmitter.on("data_received", function(){    // 5: data_received 이벤트 발생시 익명함수 호출
    console.log("데이터 수신");
});

eventEmitter.emit("connection");    // 1: connection 이벤트 발생!
console.log("프로그램을 종료합니다.");  // 6: 메세지 출력 후 종료