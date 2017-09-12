var User = require('mongoose').model('User'), 
    jwt = require('jwt-simple'), 
    moment = require('moment'),
    credentials = require('../../config/credentials');


exports.hashing = function(req, res, next)
{
    var bcrypt = require('bcrypt-nodejs');
    var password = req.body.password || '';
    
    bcrypt.genSalt(5, function(err, salt) {
        if (err){
            return res.status(500).send({
                message: err
            });
        }
        
        bcrypt.hash(password, salt, null, function(err, hash) {
            if (err){
                return res.status(500).send({
                    message: err
                });
            }
            res.json({hash: hash});
        });
    });
};
exports.login = function(req, res) 
{
    var errors = [];
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '')
        errors.push("The username is required");
    
    if (password == '')
        errors.push("The password is required");

    if( errors.length > 0 ){
        return res.status(400).send({
            message: errors.join("\n")
        });
    }
    
    User.findOne({username: username}, function (err, user) 
    {
        if (err){
            return res.status(500).send({
                message: err
            });
        }
        user.authenticate(password, function(isMatch)
        {
            if (!isMatch) {
                return res.status(400).send({
                    message: "Invalid Password!"
                });
            }
            
            var expires = moment().add(7,'days').valueOf();
            var token = jwt.encode({
                iss: user.id,
                exp: expires
            }, credentials.mySecret);
        
            return res.json({
                token : token,
                expires: expires,
                user: user.toJSON()
            });
        });
    });
};