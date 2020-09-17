module.exports = (app, fs) => {
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'My Website',
            length: 10
        });
    });
    app.get('/about', (req, res) => {
        res.render('about.html');
    });
    app.get('/list', (req, res) => {
        fs.readFile( __dirname + "/../data/member.json", "utf8", (err, data) => {
            console.log(data);
            res.writeHead(200, {'Content-Type':'text/json;charset=utf-8'});
            res.end(data);
        });
    });
    app.get('/getMember/:userid', (req, res) => {
        fs.readFile( __dirname + "/../data/member.json", "utf8", (err, data) => {
            // JSON.parse : Json 데이터를 자바스크립트 객체로 변환합니다.
            let members = JSON.parse(data);
            res.json(members[req.params.userid])
        });
    });
    // localhost:3000/joinMember/apple
    // post data -> password, name
    app.post('/joinMember/:userid', (req, res) => {
        let result = {};
        let userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] = "invalid request";
            res.json(result);
            return false;
        }
        //console.log("아이디 또는 비밀번호가 정상적으로 넘어옴!"); 
        fs.readFile( __dirname + "/../data/member.json", "utf8", (err, data) => {
            let members = JSON.parse(data);
            if(members[userid]){
                result["success"] = 101;
                result["msg"] = "duplicate";
                res.json(result);
                return false;
            }
            // console.log("중복되지 않은 아이디입니다.");
            console.log(req.body);
            members[userid] = req.body;
            // "ryuzy" : { password: '1010', name: '류정원' }
            // 자바스크립트 객체를 String으로 변환합니다.
            fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf8', (err, data) => {
                if(!err){
                    result["success"] = 200;
                    result["msg"] = "success!";
                    res.json(result);
                }
            });
        });
    });
    /*
        put : 식별자가 없을 경우 post와 동일하게 사용되지만, 식별자가 있을 경우 해당 식별자의 데이터를 변경합니다.
    */
    app.put('/updateMember/:userid', (req, res) => {
        let result = {};
        let userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] = "invalid request";
            res.json(result);
            return false;
        }
        fs.readFile( __dirname + "/../data/member.json", "utf8", (err, data) => {
            let members = JSON.parse(data);
            members[userid] = req.body;
            fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf8', (err, data) => {
                if(!err){
                    result["success"] = 200;
                    result["msg"] = "success!";
                    res.json(result);
                }
            });
        });
    });
    app.delete('/delMember/:userid', (req, res) => {
        let result = {};
        fs.readFile( __dirname + "/../data/member.json", "utf8", (err, data) => {
            let members = JSON.parse(data);
            if(!members[req.params.userid]){
                result["success"] = 102;
                result["msg"] = "not found";
                res.json(result);
                return false;
            }
            delete members[req.params.userid];
            fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf8', (err, data) => {
                if(!err){
                    result["success"] = 200;
                    result["msg"] = "success";
                    res.json(result);
                }
            });
        });
    });
}