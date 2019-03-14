const mongoose = require('mongoose');

module.exports = (app) => {
    app.get('/api/users', (req, res) => {
        console.log(req.body.startName);


    });

};