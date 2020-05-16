const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.status(200);
  res.end();
});

app.listen(port, () => {
  console.log('server is running');
});
