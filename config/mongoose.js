/**
 * option in use of the noSql mongo
 * @option: $lt(<), $lte(<=), $gt(>), $gte(>=), $ne(!=)
 * Model.remove({field: {option: 'value'},{n:n}}, callback())
 * @option: $or(OR), $not(NOT), $and(AND),
 * Model.remove({option:[{field: 'value'},{n:n}]}, callback())
 * @option: $in(IN),$nin(NOT IN)
 * Model.remove({field:{option: ['value','n']}}, callback())
 */
//load the dependencies
var config = require('./env/'+process.env.NODE_ENV+'.js'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db, { useMongoClient: true });
    //load the models
    require('../app/models/user.js');
    //return a instance of the mongoose
    return db;
};
