module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/nodedb',
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName:'MemberSchema', modelName:'MemberModel'}],
    route_info: [],
    facebook: {
        clientID: '1451036475090797',
        clientSecret: 'e0b6ffc11b9b18ef267355de7a8a9fa0',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
}