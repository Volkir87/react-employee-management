const express = require('express');
const passport = require('../config/authConfigLocal');
const bcrypt = require("bcryptjs");
const authenticate = require('./authenticate');
const isAuthenticated = require('../controller/isAuthenticated');
const User = require('../model/user');

const saltRounds = 10;
let user = new User();

// functions which will be used in the api calls
let checkUserExists = async (req, res, next) => {
    let userId = req.body.userId;
    let userExists = await user.exists(userId);
    //console.log('response = ',response);
    if (!userExists) {
        next();
    } else {
        //console.log('sending error');
        res.status('400').send('ERROR: User with this userId already exists');
    }
}

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// api routes start

let apiRoutes = express.Router();

apiRoutes.post('/user/create', checkUserExists, async (req, res) => {
    console.log('ready to insert');
    let {firstName, lastName, userId, password} = req.body;
    let hashed = await hash(password); //hash the password before saving;
    user.addNew(firstName, lastName, email, hashed)
    .then(function(response) {res.send('200')})
    .catch(function(err) {res.status(500).send('There was an error creating user: '+err)});
});

apiRoutes.post('/user/updatePwd', async (req, res) => {
    //console.log(req);
    let userId = req.body.userId;
    let newPassword = req.body.newPassword;
    let hashed = await hash(newPassword);
    let result = await user.updatePwd(userId, hashed);
    if (result) {
        res.status(200).send('Password updated successfully');
    }
});

apiRoutes.get('/user/getAll', async (req, res) => {
    try {
        let dbCallResult = await user.getAll();
        let allUsers = dbCallResult[0];
        res.status(200).json(allUsers);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
})

// apiRoutes.post('/login', passport.authenticate("local", {failureMessage: 'Incorrect user name or password'}), (req, res) => {
//     res.status(200).send('Success');
// });

apiRoutes.post('/login', authenticate, (req, res) => {
    res.status(200).send('Success');
});

apiRoutes.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});



module.exports = apiRoutes;