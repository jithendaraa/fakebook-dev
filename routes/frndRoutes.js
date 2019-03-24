const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

    app.get('/api/frndReq', async (req, res) => {
        let currentUser = req.query.currentUser;
        // console.log(currentUser)
        let user = await User.findOne({ _id: currentUser });
        let frndReqRec = user.friendReqRec;
        // console.log(frndReqRec)
        let i = 0;
        let users = [];

        if (frndReqRec.length == 0) {
            res.send(frndReqRec);
        }
        else {
            for (i = 0; i < frndReqRec.length; i++) {
                user = await User.findOne({ _id: frndReqRec[i] });
                users.push(user);
            }
            res.send(users);
        }
    });

    app.post('/api/addFrnd', async (req, res) => {
        console.log("accepted");
        // Remove from currentUser Friend req rec, remove from friend ka user frnd req sent, add friend as currentusers frnd and currentuser as friend's frnd
        const currentUser = await User.findOne({ _id: req.body.currentUser });
        const user = await User.findOne({ _id: req.body.friend._id });
        const newFriendReqRec = currentUser.friendReqRec.splice(user._id, -1);
        const newFriendReqSent = user.friendReqSent.splice(user._id, -1);
        currentUser.myFriends.push(user._id);
        user.myFriends.push(currentUser._id);
        const updateCU = await User.findOneAndUpdate({ _id: req.body.currentUser }, { friendReqRec: newFriendReqRec, myFriends: currentUser.myFriends });
        const updateU = await User.findOneAndUpdate({ _id: req.body.friend._id }, { friendReqSent: newFriendReqSent, myFriends: user.myFriends });
        res.send(req.body);
    });

    app.post('/api/declineFrnd', async (req, res) => {
        console.log("rejected");
        const currentUser = await User.findOne({ _id: req.body.currentUser });
        const user = await User.findOne({ _id: req.body.friend._id });
        const newFriendReqRec = currentUser.friendReqRec.splice(user._id, -1);
        const newFriendReqSent = user.friendReqSent.splice(user._id, -1);
        const updateCU = await User.findOneAndUpdate({ _id: req.body.currentUser }, { friendReqRec: newFriendReqRec });
        const updateU = await User.findOneAndUpdate({ _id: req.body.friend._id }, { friendReqSent: newFriendReqSent });
        res.send(req.body);
    });

    app.get('/api/myFriends', async (req, res) => {
        let friendIds = req.query.friendIds;
        // console.log(friendIds);
        let users = [];
        let user;
        let i;
        if(friendIds == undefined){
            friendIds = [];
        }
        if(friendIds.length != 0){
            for(i=0; i<friendIds.length; i++){
                user = await User.findOne({ _id: friendIds[i] });
                users.push(user);
            }
        }
        else{
            users = []
        }
       
        // console.log(users);
        res.send(users);
    })
};