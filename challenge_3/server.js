const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hey nice job');
  res.end();
});

app.post('/', (req, res) => {
  console.log(req);
  res.send('shooby doo');
  res.end();
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server connected at port ', PORT);
  }
});
