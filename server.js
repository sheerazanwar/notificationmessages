// import external moduels ==========================================================================
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
var path = require('path');
const config = require('./config/main.js');
const User = require('./models/user.js');

// initialize variables ==============================================================================
var app = express();
var port = process.env.PORT || 3000;

// configure middlewear ==============================================================================
// logger
app.use(morgan('dev'));
// json manipulation on server side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport initializtion 
app.use(passport.initialize());

// connect to database ================================================================================
mongoose.connect(config.database);
mongoose.connection.once('connected', () => console.log("Connected to database"));

// routes ================================================================================
app.use('/api',require('./routes/unauthenticated.js')); //routes which does't require token authentication
require('./config/passport')(passport);
app.use('/api',passport.authenticate('jwt', { session: false }),require('./routes/authenticated.js'));

app.get('*', (req, res) => res.status(404).send({msg:'Bik gai ha.'}));

app.listen(port, () => console.log('Server is live on port : ', port));