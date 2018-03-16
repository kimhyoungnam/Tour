var express = require('express');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy= require('passport-local').Strategy;
var session = require('express-session');

var mainRouter = require('./routes/mainRouter');
var app = express();


//9999 server port
app.listen(9999, () => {
    console.log('Server is Running');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/view/public/Main_Page.html');
});

//view안 파일 동기화
app.use(express.static('view/public/'));
app.use(flash());
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Setting Session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat'
}));

//Setting Passport
app.use(passport.initialize());
app.use(passport.session());



app.use(morgan('dev'));
app.use(mainRouter);
