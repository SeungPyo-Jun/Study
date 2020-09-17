let route_loader = {};

route_loader.init = function(app, router){
    console.log('route_loader.init 호출');
    initRoutes(app, router);
}

function initRoutes(app, router){

}

module.exports = route_loader;
