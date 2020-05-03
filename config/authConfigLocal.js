const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user"); 
const bcrypt = require("bcryptjs");

let user = new User();

passport.use(new LocalStrategy( 
    function(username, password, done) {
      user.getAllDetailsByUserId(username)
      .then(async function(userInfo){
        let result;
        if (userInfo[0].length < 1) {
          result = false;
        } else {
          result = await bcrypt.compare(password, userInfo[0][0].password);
        }
        if (!result) {
            done(null, false, {message: 'Incorrect UserID or Password'});
          } else {
            done(null, userInfo[0][0]);
          } 
      })
      .catch(function(err){
        throw err;
      })
    })); 



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.getById(id)
  .then(function(result){
    let userObj = result[0][0];
    done(null, userObj);
  })
  .catch()
});

// Exporting our configured passport
module.exports = passport;
