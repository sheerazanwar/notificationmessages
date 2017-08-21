// import external moduels ==========================================================================
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const morgan = require('morgan');
const passport = require('passport');
var path = require('path');
const config = require('./config/main.js');
const User = require('./models/user.js');
const cookieParser = require('cookie-parser');

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

//cookieParser
app.use(cookieParser());

// connect to database ================================================================================
mongoose.connect(config.database);
mongoose.connection.once('connected', () => console.log("Connected to database"));

// routes ================================================================================
app.use('/api',require('./routes/unauthenticated.js')); //routes which does't require token authentication
require('./config/passport')(passport);
//app.use('/api',passport.authenticate('jwt', { session: false }),require('./routes/authenticated.js'));

app.set('view engine', 'ejs');
    app.get('/',function(req,res){
      res.render("login");
    })



// initialize laYOUT ==============================================================================
//var routes = require('./routes/authentication.js');




//View engine ======================================
// app.use('views',path.join(__dirname,'views'));
// app.engin('ejs',exphbs({defaultLayout:'layout'}));
// app.set('view engin', 'ejs');
app.use(express.static(path.join(__dirname, 'layout')));




app.get('*', (req, res) => res.status(404).send({error:'page not found'}));

app.listen(port, () => console.log('Server is live on port : ', port));