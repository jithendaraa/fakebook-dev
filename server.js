const express = require('express');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.get('/api', (req, res) => {
  const customers = [
    { id: 1, firstName: 'aa', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];

  res.json(customers);
});

app.post('/signin', urlencodedParser, (req, res) => {
    // res.send("Welcome to Post Req" + req.body.name);
    console.log(req.body);
    // res.render("app", {data: req.body});
    // req.render('./client/app', )
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);