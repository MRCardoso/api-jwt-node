var User = require('mongoose').model('User'), 
    jwt = require('jwt-simple'), 
    moment = require('moment'),
    credentials = require('../../config/credentials');

exports.hasAuthorization = function(req, res, next) {
    var token = req.headers['x-access-token'];
    
    if (token)
    {
        var decoded = jwt.decode(token, credentials.mySecret);
        
        if (decoded.exp <= Date.now()) {
            res.status(400).send({message: 'Token expired, please make the login agains'});
        }
        
        User.findOne({ _id: decoded.iss }, function(err, user) {
            if(err)
            {
                return res.status(500).send({
                    message: "Erro to find the token of the user."
                });
            }
            req.user = user;
            return next();
        });
    } else {
        res.status(401).send({message: 'Token is required!'})
    }
};