const mongoose = require('mongoose');


const User = mongoose.model('users');

module.exports = (app) => {

    

    //API endpoint for fuzzy search
    app.get('/api/users', async (req, res) => {
        const startName = new RegExp("^" + req.query.startName);
        let users = await User.find({ displayName: { $regex: startName, $options: 'i'}});
        console.log(startName + " " + users);
        res.send(users);
    });

    //For sending Friend Requests
    app.post('/api/friendReq', async (req, res) => {
        
        User.find({ _id: req.body.to }, (error, user) => {
            if (error) {
                console.log(error);
                res.send(error);
           }

           else if(!error){
               friendReqArrRec = user[0].friendReqRec;
               friendReqSentBool = 0;
               if(friendReqArrRec.length == 0){
                   friendReqArrRec.push(req.body.from)
               }
               else if(friendReqArrRec.length > 0){
                   let i;
                   for(i=0; i<friendReqArrRec.length; i++){
                       if(friendReqArrRec[i] == req.body.from){
                           friendReqSentBool = 1;
                       }
                   }
                   if(friendReqSentBool == 0){
                       friendReqArrRec.push(req.body.from);
                   }
               }

               User.findOneAndUpdate({ _id: req.body.to }, {friendReqRec: friendReqArrRec})
               .then(() => {console.log("Friend request (Rec) sent!!!!!!!!")});    
           }
        });

        User.find({ _id: req.body.from }, (error, user) => {
            if (error) {
                console.log(error);
                res.send(error);
           }

           else if(!error){
               friendReqArrSent = user[0].friendReqSent;
               friendReqSentBool = 0;
               if(friendReqArrSent.length == 0){
                   friendReqArrSent.push(req.body.to)
               }
               else if(friendReqArrSent.length > 0){
                   let i;
                   for(i=0; i<friendReqArrSent.length; i++){
                       if(friendReqArrSent[i] == req.body.to){
                           friendReqSentBool = 1;
                       }
                   }
                   if(friendReqSentBool == 0){
                       friendReqArrSent.push(req.body.to);
                   }
               }

               User.findOneAndUpdate({ _id: req.body.from }, {friendReqSent: friendReqArrSent})
               .then(() => {console.log("Friend request (Sent) sent!!!!!!!!")});    
           }
        });
        res.send(req.body);
    })
};