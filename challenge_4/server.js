const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ham', (req, res) => {
  res.send('GET req. received');
  res.end();
});

app.post('/ham', (req, res) => {
  res.send('POST req. received');
  res.end();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server connected at port: ', PORT);
});
