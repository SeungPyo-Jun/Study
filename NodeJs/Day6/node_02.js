const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
// npm install multer
const multer = require('multer');
const path = require('path');
const logger = require('morgan');
const port = 3000;

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev')); 
app.use('/', router);

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {    // apple.jpg
        let extension = path.extname(file.originalname);    // .jpg
        let basename = path.basename(file.originalname, extension); // apple
        // apple_1596267172695.jpg
        callback(null, basename + "_" + Date.now() + extension);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        files: 3,
        fileSize: 1024 * 1024 * 1024
    }
});

// post(upload.single()) : 1개의 파일만 전송
router.route('/upload/write').post(upload.array('photo', 1), (req, res) => {
    try{
        let files = req.files;
        console.dir(req.files[0]);

        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;

        if(Array.isArray(files)){
            console.log('클라이언트에서 받아온 파일 갯수 : %d', files.length);

            for(let i=0; i<files.length; i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }

        let title = req.body.title;

        console.log("현재 파일 정보 : " + originalname + ", " + filename + ", " + mimetype + ", " + size);

        res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
        res.write('<h2>파일 업로드 성공</h2>');
        res.write('<hr>');
        res.write('<p>제목 : ' + title + '</p>');
        res.write('<p>원본 파일명 : ' + originalname + '</p>');
        res.write('<p>MIME TYPE : ' + mimetype + '</p>');
        res.write('<p>파일 크기 : ' + size + '</p>');
        res.write("<p><img src='/uploads/" + filename + "' width=200></p>");
        res.end();
    }catch(e){
        console.log(e);
    }
});

app.listen(port, () => {
    console.log("Server listening on port : " + port);
});
