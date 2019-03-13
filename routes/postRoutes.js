const mongoose = require('mongoose');
const { Schema } = mongoose;
const Post = mongoose.model('posts');

module.exports = app => {

     app.post('/api/posts', async (req, res) => {
          console.log("a");
          const post = await new Post({
               likes: [],
               dislikes: [],
               post: req.body.post,
               comments: [],
               _user: req.user.id,
               postedOn: Date.now()
          }).save();

          res.redirect('/');
     });

     app.get('/api/myposts', async (req, res) => {               //These get and post requests to '/posts' refer to the post which current_user sees on his/her dashboard and the post that they post respectively.
          const posts = await Post.find({ _user: req.user.id }).select({ _user: false });
          res.send(posts);
     });



};