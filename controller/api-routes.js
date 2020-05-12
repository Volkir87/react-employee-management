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
        res.status(500).json({error: 'User with this User ID already exists'});
    }
};

// functions which will be used in the api calls
let checkUserHasRole = async (req, res, next) => {
    let userId = req.body.userId;
    let roleId = req.body.roleId;
    let userHasRole = await user.hasRole(userId, roleId);
    //console.log('response = ', userHasRole);
    if (!userHasRole) {
        next();
    } else {
        //console.log('sending error');
        res.status(500).json({error: 'This User ID is already assigned to this Role'});
    }
};

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

// api routes start

let apiRoutes = express.Router();

apiRoutes.post('/user/create', isAuthenticated, checkUserExists, async (req, res) => {
    try {
        //console.log('ready to insert');
        let {userId, firstName, lastName, password} = req.body;
        //console.log(req.user);
        let creator = req.user.user_id;
        let hashed = await hash(password); //hash the password before saving;
        let result = await user.create(userId, firstName, lastName, hashed, creator);
        //console.log('result: ', result);
        if (result === 1) {
            //console.log('sending success response');
            let newUser = await user.getAllDetailsByUserId(userId);
            res.status(200).json({message: 'User created successfully', data: newUser[0][0]});
        } else {
            res.status(500).json({error: 'User could not be saved to the DB'})
        }
    }
    catch(error) {
        //console.log('server error: ', error);
        res.status(500).json({error: error.toString()})
    }
});

apiRoutes.post('/user/updatePwd', isAuthenticated, async (req, res) => {
    //console.log(req);
    let userId = req.body.userId;
    let newPassword = req.body.newPassword;
    let hashed = await hash(newPassword);
    let result = await user.updatePwd(userId, hashed);
    if (result) {
        res.status(200).send('Password updated successfully');
    }
});

apiRoutes.post('/user/assignRole', isAuthenticated, checkUserHasRole, async (req, res) => {
    try {
        //console.log('ready to insert');
        let {userId, roleId} = req.body;
        //console.log(req.user);
        let creator = req.user.user_id;
        let result = await user.assignRole(userId, roleId, creator);
        //console.log('result: ', result);
        if (result === 1) {
            //console.log('sending success response');
            let newUserRole = await user.getOneUserRole(userId, roleId);
            res.status(200).json({message: 'User assigned Role successfully', data: newUserRole[0][0]});
        } else {
            res.status(500).json({error: 'User could not be saved to the DB'})
        }
    }
    catch(error) {
        //console.log('server error: ', error);
        res.status(500).json({error: error.toString()})
    }
});

apiRoutes.get('/user/getAll', isAuthenticated, async (req, res) => {
    try {
        let dbCallResult = await user.getAll();
        let allUsers = dbCallResult[0];
        res.status(200).json(allUsers);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
});

apiRoutes.get('/user/getRoles', isAuthenticated, async (req, res) => {
    try {
        let dbCallResult = await user.getUserRole();
        let allUserRoles = dbCallResult[0];
        res.status(200).json(allUserRoles);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
});

apiRoutes.get('/user/getUserList', isAuthenticated, async (req, res) => {
    try {
        let dbCallResult = await user.getUserList();
        let allUsers = dbCallResult[0];
        res.status(200).json(allUsers);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
});

apiRoutes.get('/user/getRoleList', isAuthenticated, async (req, res) => {
    try {
        let dbCallResult = await user.getRoleList();
        let allRoles = dbCallResult[0];
        res.status(200).json(allRoles);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
});

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