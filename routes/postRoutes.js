const mongoose = require('mongoose');
const { Schema } = mongoose;
const Post = mongoose.model('posts');
const User = mongoose.model('users');

module.exports = app => {

     app.post('/api/posts', async (req, res) => {
          // console.log("a");
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
          const posts = await Post.find({ _user: req.user.id });
          res.send(posts);
     });

     app.post('/api/postreact', async(req, res) => {

          const post = await Post.findOne({ _id: req.body.postId }, (error, post) => {
               if (error) {
                    console.log(error);
                    res.send(error);
               }
               else if (!error) {
                    
                    let likedBool, dislikedBool, i = 0;
                    let likePos, dislikePos = -1;
                    // console.log(post[0].likes.length);                     //no of likes of the concerned pos
                    if(req.body.upvote == 1){                                 // upvote == 1 means like btn was clicked
                         if(post.likes.length == 0){
                              post.likes.push(req.body.userId);
                              for(i=0; i<post.dislikes.length; i++){
                                   if(req.body.userId == post.dislikes[i]){
                                        post.dislikes.splice(i, 1);
                                   }
                              }
                         }
                         else if(post.likes.length >= 1){
                              likePos = -1;
                              dislikePos = -1;
                              likedBool = 0;
                              dislikedBool = 0;
                              for (i = 0; i < post.likes.length; i++) {
                                   if (post.likes[i] == req.body.userId) {
                                        likedBool = 1;
                                        likePos = i;
                                   }     
                              }
                              for(i = 0; i < post.dislikes.length; i++){
                                   if (post.dislikes[i] == req.body.userId) {
                                        dislikedBool = 1;
                                        dislikePos = i;
                                   }
                              }
                              if(likedBool == 1){                                            // like already exists -> remove like
                                   post.likes.splice(likePos, 1);
                              }
                              if(dislikedBool == 1){                                          //dislike already exists -> remove dislike and add like
                                   post.dislikes.splice(dislikePos, 1);
                                   post.likes.push(req.body.userId);
                              }
                              if(likedBool == 0 && dislikedBool == 0){                           //no like or dislike already -> add like
                                   post.likes.push(req.body.userId);
                              }
                         }
                    }

                    else if(req.body.upvote == -1){                                            //dislike btn was clicked
                         likePos = -1;
                         dislikePos = -1;
                         likedBool = 0;
                         dislikedBool = 0;
                         if(post.dislikes.length == 0){
                              post.dislikes.push(req.body.userId);
                              for(i=0; i<post.likes.length; i++){
                                   if(post.likes[i] == req.body.userId){
                                        post.likes.splice(i, 1);
                                   }
                              }
                         }
                         else if(post.dislikes.length >= 1){
                              for (i = 0; i < post.dislikes.length; i++) {
                                   if (post.dislikes[i] == req.body.userId) {
                                        dislikedBool = 1;
                                        dislikePos = i;
                                   }
                              }
                              for(i = 0; i < post.likes.length; i++){
                                   if (post.likes[i] == req.body.userId) {
                                        likedBool = 1;
                                        likePos = i;
                                   }
                              }
                              if(dislikedBool == 1){                                            // dislike already exists -> remove dislike
                                   post.dislikes.splice(dislikePos, 1);
                              }
                              if(likedBool == 1){                                          //like already exists -> remove like and add dislike
                                   post.likes.splice(likePos, 1);
                                   post.dislikes.push(req.body.userId);
                              }
                              if(likedBool == 0 && dislikedBool == 0){                           //no like or dislike already -> add like
                                   post.dislikes.push(req.body.userId);
                              }
                         }
                    }
                    
                    Post.findOneAndUpdate({ _id: req.body.postId }, {likes: post.likes, dislikes: post.dislikes})
                         .then(() => {console.log("updated")}); 
               }     
          });
          res.send(req.body);
     });


     // app.get('/api/myposts', async (req, res) => {               //These get and post requests to '/posts' refer to the post which current_user sees on his/her dashboard and the post that they post respectively.
     //      const posts = await Post.find({ _user: req.user.id });
     //      res.send(posts);
     // });

     app.get('/api/dashboardPosts', async (req,res) => {
          
          const currentUser = await User.findOne({ _id: req.query.currentUser});
          const friends = currentUser.myFriends;
          let i;

          let dashboardIds = friends.concat(currentUser._id);

          let posts, post, user;
          posts = [];
          
          if(dashboardIds.length !== 0){
               for(i=0; i<dashboardIds.length; i++){
                    post = await Post.findOne({ _user: dashboardIds[i] });
                    user = await User.findOne({ _id: dashboardIds[i] });
                    if(post == null){
                         post = {};
                    }
                    // post.displayName = "lmao";
                    
                    post = {
                         ...post,
                         displayName: user.displayName,
                         email: user.email
                    };
                    // console.log(post);
                    // console.log(post.displayName);
                    posts.push(post);
                    
               }
               // console.log(posts);
          }
          res.send(posts);
     });
};