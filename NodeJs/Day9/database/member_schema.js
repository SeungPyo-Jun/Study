const { Schema } = require("mongoose");
const passport = require("passport");
// npm install crypto
const crypto = require('crypto');

Schema.createSchema = function(mongoose){
    console.log('createSchema() 호출');
    let MemberSchema = mongoose.Schema({
        userid: {type: String, required: true, default:''},
        hashed_password: {type: String, required: true, default:''},
        name: {type: String, default:''},
        salt: {type: String, required:true},
        age: {type: Number, default:''},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
    });

    MemberSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('virtual password 호출됨 : ' + this.hashed_password);
    })
    .get(function() {
        return this._password;
    });

    MemberSchema.method('encryptPassword', function(plainText, inSalt) {
        if(inSalt){
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        }else{
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    MemberSchema.method('makeSalt', function(){
        console.log('makeSalt() 호출');
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    MemberSchema.method('authenticate', function(plainText, inSalt, hashed_password) {
        if(inSalt){
            console.log('authenticate 호출 : inSalt(있음)');
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        }else{
            console.log('authenticate 호출 : inSalt(없음)');
            return this.encryptPassword(plainText) === this.hashed_password;
        }
    });

    let validatePresenceOf = function(value) {
        return value && value.length;
    }

    /*
        pre() : 트리거
    */
    MemberSchema.pre('save', (next) => {
        if(!this.isNew) return next();
        if(!validatePresenceOf(this.password)){
            next(new Error('유효하지 않은 password 필드입니다.'));
        }else{
            next();
        }
    });


    MemberSchema.path('userid').validate((userid) => {
        return userid.length;
    }, 'userid 컬럼의 값이 없습니다.');

    MemberSchema.path('hashed_password').validate((hashed_password) => {
        return hashed_password.length;
    }, 'hashed_password 컬럼의 값이 없습니다.');

    MemberSchema.static('findByUserid', (userid, callback) => {
        return this.find({userid:userid}, callback);
    });

    MemberSchema.static('findAll', (callback) => {
        return this.find({}, callback);
    });

    console.log('MemberSchema 정의완료');
    return MemberSchema;
};

module.exports = Schema;