var User = require('mongoose').model('User'), 
    jwt = require('jwt-simple'), 
    moment = require('moment'),
    credentials = require('../../config/credentials');

exports.hasAuthorization = function(req, res, next) {
    var token = req.headers['x-access-token'];
    
    if (token)
    {
        var decoded = jwt.decode(token, credentials.mySecret);
        console.log('decodando ' + decoded);
        
        if (decoded.exp <= Date.now()) {
            res.status(400).send({message: 'Acesso Expirado, faça login novamente'});
        }
        
        User.findOne({ _id: decoded.iss }, function(err, user) {
            if(err)
            {
                return res.status(500).send({
                    message: "erro ao procurar usuario do token."
                });
            }
            req.user = user;
            console.log('achei usuario ' + req.user)
            return next();
        });
    } else {
        res.status(401).send({message: 'Token não encontrado ou informado'})
    }
};