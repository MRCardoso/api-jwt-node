var User = require('mongoose').model('User'), 
    jwt = require('jwt-simple'), 
    moment = require('moment'),
    credentials = require('../../config/credentials'),
    help = require('../helpers');

/*
| --------------------------------------------------------------------------------
| Create a hash string with base in the password send
| --------------------------------------------------------------------------------
*/
exports.hashing = function(req, res, next)
{
    var bcrypt = require('bcrypt-nodejs');
    var password = req.body.password || '';
    
    bcrypt.genSalt(5, function(err, salt) {
        if (err){
            return res.status(500).send({
                message: help.getErrorMessage(err)
            });
        }
        
        bcrypt.hash(password, salt, null, function(err, hash) {
            if (err){
                return res.status(500).send({
                    message: help.getErrorMessage(err)
                });
            }
            res.json({hash: hash});
        });
    });
};
/**
| --------------------------------------------------------------------------------
| Authenticate a user by username and password, 
| and creates a token to use in api secrety requests
| --------------------------------------------------------------------------------
* @param {req} the data of request app
* @param {res} the data of response app
*/
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

exports.list = function(req, res){
    User.find({}, (err, users) => {
        if (err){
            return res.status(500).send({
                message: err
            });
        }

        res.json(users);
    });
};

exports.create = function(req, res, next)
{
    User.findUniqueUsername(req.body.username, validate =>
    {
        if( validate !== false ){
            return res.status(500).send({
                message: help.getErrorMessage(validate)
            });
        } 

        var user = new User({
            name: req.body.name,
            email: req.body.email,
            status: req.body.status,
            username: req.body.username,
            password: req.body.password
        });
        user.save(err => {
            if (err){
                return res.status(400).send({
                    message: help.getErrorMessage(err)
                });
            }
            res.json({
                message: `User ${user.name} created with successfull`, 
                data: user
            });
        });
    });
};