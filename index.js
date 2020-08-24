 const express = require('express');
 const cookieParser = require('cookie-parser');
 const app = express();
 const port = 8000;
 const expressLayouts = require('express-ejs-layouts');
 const db = require('./config/mongoose');
 //Used for session cookie
 const session = require('express-session');
 const passport = require('passport');
 const passportLocal = require('./config/passport-local-strategy');
 //To store session cookies parmanently 
 const MongoStore = require('connect-mongo')(session);
 const sassMiddleware = require('node-sass-middleware');

 //Place it before server starts as files needs to be compiled first
 app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'expanded',
    prefix : '/css'
 }));
 
 //For cookies
 app.use(express.urlencoded());
 app.use(cookieParser());
 app.use(express.static('./assets'));
 app.use(expressLayouts);
 
 //Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in db
app.use(session({
    name : 'codeial',
    //ToDo change the secret before deployement in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        //Defining the session time
        maxAge : (1000*60*100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    //In case connection is not stablished
    function(err){
        console.log(err || 'Connect-mongodb setup ok');
      }
    )
 }));
 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

 //Use express router
app.use('/', require('./routes/index')); 


 app.listen(port, function(err){
     if(err){
         //console.log("Error");
         //Using interpolation
        console.log(`Error in running the server: ${err}`);
     }
     console.log(`Server is running on port : ${port}`);
 });