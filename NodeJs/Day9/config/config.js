module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/nodedb',
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName:'MemberSchema', modelName:'MemberModel'}],
    route_info: []
}