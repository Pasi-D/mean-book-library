var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config/database');

var Admin = require('../schemas/adminAPI');

router.post('/register', function (req, res) {
    let newAdmin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    Admin.addAdmin(newAdmin, function (err, admin) {
        if (err) {
            res.json({success: fail, msg:'Failed to register the admin'});
        } else {
            res.json({success: true, msg:'admin registered'});
        }
    });
})

router.get('/profile', function (req, res) {
    res.send('Admin Profiles');
})

router.post('/authenticate', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Admin.getAdminByUsername(username, function (err, admin) {
        console.log('getAdminByUsername');
        
        if(err) throw err;
        if(!admin){
            return res.json({success: false, msg:'Admin not found'});
        }
        console.log('Admin found!');
        Admin.comparePassword(password, admin.password, function (err, isMatch) {
            if(err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: admin}, config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT'+token,
                    admin: {
                        id: admin._id,
                        username: admin.username,
                        email: admin.email
                    }
                });
            }else {
                return res.json({success: false, msg:'wrong password'});
            }
        });
    });
})

module.exports = router;