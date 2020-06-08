const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('GET req. received');
  res.end();
});

app.post('/', (req, res) => {
  res.send('POST req. received');
  res.end();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server connected at port: ', PORT);
});
