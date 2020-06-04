const express = require('express');
const app = express();
const db = require('./database/index.js');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hey nice job');
  res.end();
});

app.post('/post', (req, res) => {
  let document = req.body;

  db.addPurchase(document)
    .then((result) => {
      console.log(result);
      return result.insertedId;
    })
    .then((id) => {
      res.type('json');
      res.send(JSON.stringify({ new: id }));
      res.end();
    });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server connected at port ', PORT);
  }
});
