const express = require('express');
require('./services/passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
authRoutes(app);

// console.developers.google.com

// app.post('/signin', urlencodedParser, (req, res) => {
//   // res.send("Welcome to Post Req" + req.body.name);
//   console.log(req.body);
//   // res.render("app", {data: req.body});
//   // req.render('./client/app', )
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);