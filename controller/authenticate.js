// function is used to properly configure what is returned to the front end in case of authentication error 

const passport = require('../config/authConfigLocal');

module.exports = (req, res, next) => {
    console.log('called authenticate');
    passport.authenticate("local", (err, user, info) => {
        console.log('starting authentication');
        console.log('user is: ', user);
        if (err) {next(err)}
        if (!user) {
            req.session.message = info.message;
            res.status(401).json({message: info.message})
        } else {
            next()
        }
    })(req, res, next);
    }