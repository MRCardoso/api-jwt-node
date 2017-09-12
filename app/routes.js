var security = require('./middlewares/security.js'),
    user = require('./controllers/user.controller.js');

module.exports = function (app)
{
    app.get('/', function(req,res){ 
        res.json({message: 'Welcome'}); 
    });
    
    app.get('/api/users', security.hasAuthorization, user.list);
    app.post('/api/users/create',security.hasAuthorization, user.create);

    app.post('/api/login', user.login);
    app.post('/api/hashing', user.hashing);
};