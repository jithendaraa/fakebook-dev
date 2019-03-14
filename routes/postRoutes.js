const mongoose = require('mongoose');
const { Schema } = mongoose;
const Post = mongoose.model('posts');

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

     app.post('/api/postreact', (req, res) => {

          Post.find({ _id: req.body.postId }, (error, post) => {
               if (error) {
                    console.log(error);
                    res.send(error);
               }
               else if (!error) {
                    
                    let likedBool, dislikedBool, i = 0;
                    let likePos, dislikePos = -1;
                    // console.log(post[0].likes.length);                     //no of likes of the concerned pos
                    if(req.body.upvote == 1){                                 // upvote == 1 means like btn was clicked
                         if(post[0].likes.length == 0){
                              post[0].likes.push(req.body.userId);
                              if(post[0].dislikes.length > 0){
                                   for(i=0; i<post[0].dislikes.length; i++){
                                        if(post[0].dislikes[i] == req.body.userId){
                                             post[0].dislikes.splice(i, 1);
                                        }
                                   }
                              }
                         }
                         else if(post[0].likes.length >= 1){
                              for (i = 0; i < post[0].likes.length; i++) {
                                   if (post[0].likes[i] == req.body.userId) {
                                        likedBool = 1;
                                        likePos = i;
                                   }
                                   if (post[0].dislikes[i] == req.body.userId) {
                                        dislikedBool = 1;
                                        dislikePos = i;
                                   }
                              }
                              if(likePos !== -1){                                            // like already exists -> remove like
                                   post[0].likes.splice(likePos, 1);
                              }
                              if(dislikePos !== -1){                                          //dislike already exists -> remove dislike and add like
                                   post[0].dislikes.splice(dislikePos, 1);
                                   post[0].likes.push(req.body.userId);
                              }
                              if(likePos == -1 && dislikePos == -1){                           //no like or dislike already -> add like
                                   post[0].likes.push(req.body.userId);
                              }
                         }
                    }

                    else if(req.body.upvote == -1){                                            //dislike btn was clicked
                         if(post[0].dislikes.length == 0){
                              post[0].dislikes.push(req.body.userId);
                              if(post[0].likes.length > 0){
                                   for(i=0; i<post[0].likes.length; i++){
                                        if(post[0].likes[i] == req.body.userId){
                                             post[0].likes.splice(i, 1);
                                        }
                                   }
                              }
                         }
                         else if(post[0].dislikes.length >= 1){
                              for (i = 0; i < post[0].dislikes.length; i++) {
                                   if (post[0].dislikes[i] == req.body.userId) {
                                        dislikedBool = 1;
                                        dislikePos = i;
                                   }
                                   if (post[0].likes[i] == req.body.userId) {
                                        likedBool = 1;
                                        likePos = i;
                                   }
                              }
                              if(dislikePos !== -1){                                            // dislike already exists -> remove dislike
                                   post[0].dislikes.splice(dislikePos, 1);
                              }
                              if(likePos !== -1){                                          //like already exists -> remove like and add dislike
                                   post[0].likes.splice(likePos, 1);
                                   post[0].dislikes.push(req.body.userId);
                              }
                              if(likePos == -1 && dislikePos == -1){                           //no like or dislike already -> add like
                                   post[0].dislikes.push(req.body.userId);
                              }
                         }
                    }
                    

                    Post.findOneAndUpdate({ _id: req.body.postId }, {likes: post[0].likes, dislikes: post[0].dislikes})
                         .then(() => {console.log("updated")});
               }     
          });
          res.send(req.body);
     });
};