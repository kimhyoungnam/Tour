/*
var LocalStrategy = require('passport-local').Strategy;
var connectdB = require('./connectdB');

connectdB();
module.exports = (passport) =>{

  passport.serializeUser((user,done)=>{
    console.log('passport session save:',user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id,done)=>{
    console.log('passport session getData',id);
    //User.findById(id,done);
  });

  passport.use('local-join', new LocalStrategy({

    usernameField: 'user_email',
    passwordField: 'user_pw',
    passReqToCallback: true
  }, (req, user_email, user_pw, done)=>{
    
    var query = connection.query('select user_pw from user where user_email= ?',[user_email],(err,rows) =>{
      if(err) return done(err);

      if(rows.length){
        console.log(rows.length);
        return done(null, {'email':user_email, 'pw':rows[0]})
      }else{
        return done(null,false,{'message':'Your loginInfo is not Found'})
      }
    });
  }));

};
*/

