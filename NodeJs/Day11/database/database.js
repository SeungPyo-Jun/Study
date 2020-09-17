const mongoose = require('mongoose');
let database = {};

database.init = function(app, config){
    console.log('database.init() 호출');
    connect(app, config);
}

function connect(app, config){
    console.log('connect() 호출');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database.db = mongoose.connection;

    /*
        console.log
        console.dir
        console.info : 정보
        console.error : 에러
        console.warn : 경고
    */
    database.db.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.db.on('open', () => {
        console.log('데이터베이스 연결 성공!');
        createSchema(app, config);
    });
    database.db.on('disconnected', connect);
}

function createSchema(app, config){
    let schemaLen = config.db_schemas.length;
    console.log('설정에 정의된 스키마의 갯수 : %d', schemaLen);

    for(let i=0; i<schemaLen; i++){
        let curItem = config.db_schemas[i];
        let curSchema = require(curItem.file).createSchema(mongoose);
        console.log('%s 모듈을 불러들인 후 스키마를 정의함', curItem.file);

        let curModel = mongoose.model(curItem.collection, curSchema);
        console.log('%s 컬렉션을 위해 모델 정의함', curItem.collection);

        database[curItem.schemaName] = curSchema;
        // database[MemberSchema] = curSchema 객체;
        database[curItem.modelName] = curModel;
        // database[MemberModel] = curModel 객체;
        console.log('스키마이름[%s], 모델이름[%s]이 데이터베이스 객체의 속성으로 추가되었습니다.', curItem.schemaName, curItem.modelName);
        app.set('database', database);
        console.log('database 객체가 app객체의 속성으로 추가됨');
    }
}

module.exports = database;
