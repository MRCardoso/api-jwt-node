var security = require('./middlewares/security.js'),
    user = require('./controllers/user.controller.js');

module.exports = function (app)
{
    app.route('/api/users')
        .post(security.hasAuthorization, function(req,res){
            res.json({'message': 'is a GET request'});
        })
        .get(security.hasAuthorization, function(req,res){
            res.json({'message': 'is a GET request'});
        });

    app.get('/', function(req,res){
        res.json({message: 'Welcome'});
    });
    app.post('/api/login', user.login);
    app.post('/api/hashing', user.hashing);
};