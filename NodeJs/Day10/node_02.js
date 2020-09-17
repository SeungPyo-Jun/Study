const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');
// npm install express-error-handler
const expressErrorHandler = require('express-error-handler');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
// npm install socket.io 
const socketio = require('socket.io');
// npm install cors
// 클라이언트에서 ajax로 요청시 cors(다중 서버 접속) 지원
const cors = require('cors');


let app = express();
let port = 3000;
let router = express.Router();
let router_loader = require('./routes/route_loader');
router_loader.init(app, router);

app.use(cookieParser());
app.use(expressSession({
    secret: '!@#$%^&*()',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// 클라이언트에서 ajax로 요청시 CORS 지원을 익스프레스에 등록
app.use(cors());

// passport 사용설정
// passport의 세션을 사용하려면 그 전에 Express의 세션을 사용하는 코드가 있어야 합니다.
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use('/', router);

let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

let config = require('./config/config');
let database = require('./database/database');

// 패스포트 설정
let configPassport = require('./config/passport');
configPassport(app, passport);

let userPassport = require('./routes/route_member');
userPassport(router, passport);

const server = app.listen(port, () => {
    console.log('Server listening on port : ' + config.server_port);
    database.init(app, config);
});

// socket.io 서버
const io = socketio.listen(server);
console.log('socket.io 요청을 받을 준비 완료!');

io.sockets.on('connection', (socket) => {
    console.log('connection : ', socket.request.connection._peername);
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
});

