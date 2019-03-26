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
        // console.log(file.path + "  " + filename)
        User.findOneAndUpdate({ _id: req.user.id }, { image: filename }).then(async() => {
            let user = await User.findOne({ _id: req.user.id});
        });
        res.send(req.body)
    });

    app.get('/api/uploadPic', async (req, res) => {
        let user = await User.findOne({ _id: req.user.id });
        res.send(user.image);
    }); 
}