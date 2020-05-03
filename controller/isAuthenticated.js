// Middleware for restricting routes a user is not allowed to visit if not logged in
const passport = require('passport');

module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      next();
    } else {
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/login");
    }
  };