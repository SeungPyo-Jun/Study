module.exports = function(router, passport){
    console.log('route_user 호출');

    router.route('/').get((req, res) => {
        res.render('index.ejs');
    });
}