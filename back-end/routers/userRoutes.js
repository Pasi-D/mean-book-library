var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config/database');

var User = require('../schemas/userAPI');

router.post('/register', function (req, res) {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, function (err, user) {
        if (err) {
            res.json({success: fail, msg:'Failed to register the user'});
        } else {
            res.json({success: true, msg:'user registered'});
        }
    });
})

router.get('/profile', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    res.json({user: req.user});
})

router.post('/authenticate', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, function (err, user) {                
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        }        
        User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }else {
                return res.json({success: false, msg:'wrong password'});
            }
        });
    });
})

module.exports = router;