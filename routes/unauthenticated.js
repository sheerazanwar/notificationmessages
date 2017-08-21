const express = require('express');
var router = express.Router();

var user = require('../api/user.js');
router.post('/register', user.register);
router.post('/authenticate', user.authenticate);


var notification=require('../api/notification.js');
router.get('/notification',notification.getAll);
router.post('/notification/add',notification.add);
router.put('/notification/:id',notification.edit);


module.exports = router;




// var express=require('express');
// var router=express.Router();
// var passport=require('passport');
// var app=express();
// var authorize = require('../api/user.js');
// router.post('/dashboard',passport.authenticate('jwt', { session: false }), authorize.dashboard);


// var auth = require('../api/user.js');
// router.post('/register', auth.register);
// app.use('/api',passport.authenticate('jwt', { session: true }),require('../routes/authenticated.js'));
// router.post('/authenticate', auth.authenticate);



// //routes for notification table of database
// var notification=require('../api/notification.js');
// router.get('/notification',notification.getAll);
// router.post('/notification/add',notification.add);
// router.put('/notification/:id',notification.edit);




// //export all modules
// module.exports=router;
