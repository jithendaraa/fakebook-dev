const passport = require('passport');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send("localhost Port 5000 is working :)");
    });

    app.get('/yay', (req, res) => {
        res.send("OAuth is done succesfully!");
    });

    app.get('/auth/google', passport.authenticate("google", {
        scope: ['profile', 'email']
    })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/')
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};


