var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var connectdB = require('../../lib/connectdB');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

connectdB();
connection.connect();

router.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname,'../../view/public/Intro.html'));
});

passport.serializeUser((user,done)=>{
  console.log('passport session save: ',user.user_email);
  done(null,user.user_email);
});

passport.deserializeUser((id,done)=>{
  console.log('passport session getdata', id);
  done(null, id);
});

passport.use('local-join',new LocalStrategy({

  //email , password
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

}, (req, email, password, done)=>{
  var query = connection.query('select user_pw from user where user_email=?',[email], (err,rows) =>{

    if(err) return done(err);
    
    if(rows.length){
      if(password === rows[0].user_pw){
        console.log("Success");
        return done(null, {'user_email':email,'user_pw':rows[0].user_pw});
      }else{
        return done(null,false,{'message':'Your loginInfo is false'});
      }
    }else{
      return done(null,false,{'message':'Your loginInfo is not Found'});
    }
  });
}));

router.post('/', (req,res,next)=>{

  passport.authenticate('local-join', (err,user,info)=>{

    console.log('Authenticate');
    if(err) res.status(500).json(err);
    
    if(!user)return res.status(401).json(info.message);

    req.logIn(user,function(err){
      if(err) {return next(err);}
      //return res.json(user);
      return res.sendFile(path.join(__dirname,'../../view/public/Intro.html'));
    });
  })(req,res,next);
});


// 경로 설정해주기
/*
router.post('/', passport.authenticate('local-join', {

  successRedirect: '/main',
  failureRedirect: '/join',
  failureFlash: true 
}))


*/

module.exports = router;



/*
router.post('/form', (req,res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  var responseData = {};

  var query = connection.query('select user_pw from user where user_email="'+email+'"',(err,rows)=>{

    var msg = responseData.result = 'ok';

    responseData = rows[0].user_pw;

    if(password === responseData){
      console.log('Login Success');
      
    }else{
      console.log('비밀번호가 틀렸습니다');
    }
  });
});
*/
