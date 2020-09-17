const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');
// npm install express-error-handler
const expressErrorHandler = require('express-error-handler');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// npm install passport
const passport = require('passport');

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


let userPassport = require('./routes/route_user');
userPassport(router, passport);

app.listen(port, () => {
    console.log('Server listening on port : ' + config.server_port);
});

