const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const upload = multer({dest: 'uploads/'});

const User = mongoose.model('users');




module.exports = (app) => {

    app.post('/api/uploadPic', upload.any(),  (req, res, next) => {
        let file = req.files[0];
        console.log(file);
        let filename = (new Date).valueOf() + "-" + file.originalname;
        fs.rename(file.path, 'client/public/images/'+filename, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("IMAGE UPLOADED.... " + filename);
        });
        console.log(file.path + "  " + filename)
        User.findOneAndUpdate({ _id: req.user.id }, { image: filename }).then(async() => {
            let user = await User.findOne({ _id: req.user.id});
            console.log(user);
        });
        res.send(req.body)
    });

    app.get('/api/uploadPic', async (req, res) => {
        console.log("inside img get api")
        console.log(req.user.id);
        let user = await User.findOne({ _id: req.user.id });
        // console.log(user.image);
        // console.log(user.image.data);
        res.send(user.image);
        // res.sendFile( __dirname + '/public/images/1553599076981-snekk.jpg');
    });
        
        // console.log(req.query.userId)
    

    
}