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
  let id = document.currentDocId;
  console.log(id);
  delete document.currentDocId;

  db.addPurchase(document, id)
    .then((result) => {
      console.log(result);
      return result;
    })
    .then((result) => {
      // let id = {};
      // if (result.upsertedId) {
      //   id = { new: _id };
      // }
      res.type('json');
      res.send(JSON.stringify(id));
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server connected at port ', PORT);
  }
});
