const express = require('express');
const next = require('next');
const PORT = 3000;

const dev = process.env.NODE_ENV !== 'production'; //will return true if non-prod, false if prod
const app = next({dev});
const handle = app.getRequestHandler(); // what is it? 

app.prepare()
.then(() => {
    const server = express();
    server.get('*', (req, res) => {
        return handle(req, res);
    })
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log('Application is ready on port: ', PORT);
    })
})
.catch((ex) => {
    console.error(ex.stack); //what is this? 
    process.exit(1); // what is this?
});

