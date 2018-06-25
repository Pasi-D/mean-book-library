var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({ 
    name: {
        type: String,
        required: true
    },      
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;