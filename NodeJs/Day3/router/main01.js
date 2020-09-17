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
}