const express = require('express');


// api routes start

let apiRoutes = express.Router();

apiRoutes.post('/login', (req, res) => {
    let user = req.user;
    let password = req.password;
    console.log('login request made with user and password: ' + user + ', ' + password);
})