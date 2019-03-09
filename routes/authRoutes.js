const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};

//   app.get('/api/customers', (req, res) => {
//     const customers = [
//       { id: 1, firstName: 'aa', lastName: 'Doe' },
//       { id: 2, firstName: 'b', lastName: 'Traversy' },
//       { id: 3, firstName: 'asdasdas', lastName: 'Swanson' },
//     ];

//     res.json(customers);
//   });