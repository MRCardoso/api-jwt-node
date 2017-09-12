'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

/**
 * Create a Schema of the table 'User'
 * */
var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/,"Por favor preencha um endereço de E-mail válido!"],
        default: ''
    },
    username: {
        type: String,
        unique: true,
        required: "O campo usuário é obrigatório!",
        trim: true
    },
    password: {
        type: String,
        required: "O campo senha é obrigatória!",
        validate: [
            function(password)
            {
                return password && password.length > 6;
            }, "A senha deve ter mais de 6 caracteres!"
        ]
    },
    status: {
        type: Number,
        default: 1 // 1 - active | 0 - inactive
    },
    created:{
        type: Date,
        default: Date.now
    },
});
/**
 * method pre('save')
 * set a hash to password only in insert
 */
UserSchema.pre('save', function(next)
{
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(5, function(err, salt) {
        if (err) 
            return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * method authenticate
 * to validation of the password the user
 * @param password
 */
UserSchema.methods.authenticate = function(password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) 
            return next(err);
        next(isMatch);
    });
};
/**config 'UserSchema' for use getters and virtuals when is transformed in JSON*/
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

/**create the model by UserSchema*/
mongoose.model('User', UserSchema);