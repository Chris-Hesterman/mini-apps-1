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
  console.log('document from front end: ', document);
  let id = document.currentDocId;
  delete document.currentDocId;

  db.addPurchase(document, id)
    .then((result) => {
      let response = { new: id };
      console.log(result);
      if (result.ops) {
        response = { new: result.ops[0]._id };
      }
      res.type('json');
      res.send(response);
    })
    .then(() => {
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
