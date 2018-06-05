var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');
var config = require('../config/database');


var AdminSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = function(id, callback){
    Admin.findById(id, callback);
}

module.exports.getAdminByUsername = function(username, callback){
    const query = {username: username}
    Admin.findOne(query, callback);
}

module.exports.addAdmin = function(newAdmin, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newAdmin.password, salt,function(err, hash){
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}