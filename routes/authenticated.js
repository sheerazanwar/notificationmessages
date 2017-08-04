const express = require('express');
var router = express.Router();

var user = require('../api/user.js');
router.get('/dashboard', user.dashboard);



// //routes for notification table of database
var notification=require('../api/notification.js');
router.get('/notification',notification.getAll);
router.post('/notification/add',notification.add);
router.put('/notification/:id',notification.edit);

// //routes for user table of database
var user=require('../api/user.js');
router.get('/user',user.getAll);
router.post('/user/add',user.add);
router.put('/user/:id',user.edit);

// //routes for user table of database
var feedback=require('../api/feedback.js');
router.get('/feedback',feedback.getAll);
router.post('/feedback/add',feedback.add);
router.put('/feedback/:id',feedback.edit);


module.exports = router;