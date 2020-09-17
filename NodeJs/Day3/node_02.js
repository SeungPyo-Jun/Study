// npm install nodemailer
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'ryuzy1011@gmail.com',
        pass: ''
    },
    host: 'smtp.mail.com',
    port: '465'
});

let mailOptions = {
    from : "류정원 <ryuzy1011@mail.com>",
    to : "ryuzy@naver.com",
    subject : "node.js email 테스트중입니다.",
    // text : "안녕하세요. 잘 전달되나요?????"
    html : "<h2>안녕하세요. 잘 전달되나요??? </h2><p>반가워요 ~~~~</p>"
};

transporter.sendMail(mailOptions, (err, info) => {
    transporter.close();
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
});
// 하다하다 안되는분
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";