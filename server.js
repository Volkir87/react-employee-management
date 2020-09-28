const express = require('express');
const next = require('next');
const PORT = 3000;
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");
const path = require("path");
const isAuthenticated = require('./controller/isAuthenticated');

const dev = process.env.NODE_ENV !== 'production'; //will return true if non-prod, false if prod
const app = next({dev});
const handle = app.getRequestHandler(); // what is it? 

const apiRoutes = require('./controller/api-routes');

app.prepare()
.then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(express.static(path.join(__dirname, 'public')));
    // configuring the session
    const sessionConfig = {
        secret: 'secret',
        cookie: {
          maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true
      };
      server.use(session(sessionConfig));
    // configuring passport
    server.use(passport.initialize());
    server.use(passport.session());

    server.use('/api', apiRoutes);

    server.get('/secured/*', isAuthenticated, (req, res) => {
        return handle(req, res);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log('Application is ready on port: ', PORT);
    })
})
.catch((ex) => {
    console.error(ex.stack); //what is this? 
    process.exit(1); // what is this?
});

