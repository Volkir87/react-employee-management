// function is used to properly configure what is returned to the front end in case of authentication error 

const passport = require('../config/authConfigLocal');

module.exports = (req, res, next) => {
    console.log('called authenticate');
    passport.authenticate("local", (err, user, info) => {
        if (err) {return next(err)}
        if (!user) {
            req.session.message = info.message;
            return res.status(401).json({message: info.message})
        }
        req.login(user, (err) => {
            if (err) { return next(err); }
            return next()});
    })(req, res, next);
    }