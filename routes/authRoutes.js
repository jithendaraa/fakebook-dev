const passport = require('passport');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send(
            {googleId : "123123 -- Number",
            userName: 'Jith',
            userEmail: 'jithen.subra@gmail.com',
            myFrnds: ["a", "s", "d"],
            myPosts: [{ //PostSchema
                post: "postText for post1 -- String",
                likes: "likes for post1 -- Array",
                dislikes: "dislikes for post1 -- Array",
                user: "post by user -- String ",
                comments: [{ // CommentSchema
                    likes: "likes for comment1 -- Array",
                    dislikes: "dislikes for comment1 -- Array",
                    user: "Comment by user id -- String",
                    replies: [{ // ReplySchema
                        user: "Reply by user -- String",
                        likes: "likes for reply1 -- Array",
                        dislikes: "dislikes for reply2 -- Array"
                    }]
                }]
            }]
            }
        );
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

    // app.get('/submit/newPost', (req, res) => {
    //     res.send(req);
    // });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};


