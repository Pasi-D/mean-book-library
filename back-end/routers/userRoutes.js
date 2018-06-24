var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config/database');

var User = require('../models/users');

var userController = require('../controllers/userAPI');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    userController.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: fail, msg:'Failed to register the user'});
        } else {
            res.json({success: true, msg:'user registered'});
        }
    });
})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
})

router.post('/authenticate', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userController.getUserByUsername(username, (err, user) => {                
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        }        
        userController.comparePassword(password, user.password, (err, isMatch) => {
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
                        email: user.email,
                        role: user.role
                    }
                });
            }else {
                return res.json({success: false, msg:'wrong password'});
            }
        });
    });
})

module.exports = router;