const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config/main.js');

exports.register = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save((err) => {
            if (err) {
                return res.json({ success: false, message: 'Please enter email and password.' });
            } else {
                return res.json({ success: true, message: 'wala' });
            }
        });
    }
}

exports.authenticate = function (req, res) {
  
    User.findOne({email:req.body.email}, function (err, user) {
        if (err) {
            throw err;
        } else if (user) {
            if (user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret, { expiresIn: 10000 });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.json({ success: false, message: 'password did not match.' });
                }
            }));
        } else {
            res.send({ success: false, message: 'Authentication failed.' })
        }
    });
}

exports.dashboard = function(req, res){
    if(req.isAuthenticated){
    res.status(200).send({'Bik gai ha. : ':req.user._id})
    }else{
        console.log('war paray');
    }

}


exports.getAll = function (req, res) {
    User
        .find({})
        .exec(function (error, user) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(user);
            }
        })
}

// //function used to post some data in database
exports.add = function (req, res) {
    if (req.body.name == undefined || req.body.email == undefined || req.body.password == undefined) {
        res
            .status(404)
            .send({message: 'one or more perameters missing'});
    } else {
        new User({name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role}).save();
        res.end();
    }
}

// //function used to edit some data in database
exports.edit = function (req, res) {
    if (req.params.id == undefined) {
        res
            .status(404)
            .send({message: 'one or more perameters missing'});
    } else {
        User
            .findOne({_id: req.params.id})
            .exec(function (error, user) {
                //  console.log(user);
                user.name = req.body.name
                    ? req.body.name
                    : user.name;
                user.email = req.body.email
                    ? req.body.email
                    : user.email;
                user.password = req.body.password
                    ? req.body.password
                    : user.password;
                user.role = req.body.role
                    ? req.body.role
                    : user.role;
                user.save(function (error, user) {
                    if (error) {
                        res
                            .status('500')
                            .send({message: 'error found'})
                    } else {
                        res
                            .status('202')
                            .send({message: 'updated'})
                    }
                });
            })
    }
}

// //function used to delete some data from database
// exports.delete = function (req, res) {
//     if (req.params.id == undefined) {
//         res
//             .status(404)
//             .send({message: 'one or more perameters missing'});
//     } else {
//         User
//             .findOne({_id: req.params.id})
//             .exec(function (error, user) {
//                 console.log(user);
//                 if (user.isDeleted == false) {
//                     user.isDeleted = true;
//                 }
//                 user
//                     .save(function (error, user) {
//                         if (error) {
//                             res
//                                 .status('500')
//                                 .send({message: 'error found'})
//                         } else {
//                             res
//                                 .status('202')
//                                 .send({message: 'deleted'})
//                         }
//                     });
//             })
//     }
// }
