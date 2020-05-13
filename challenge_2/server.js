const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Hey There World');
});

app.post('/', (req, res) => {
  console.log(req.body.jsonData);
  let csv =
    'firstName,lastName,county,city,role,sales<br>Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000<br>Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000<br>Smitty,Won,San Mateo,Redwood City,Sales Person,4800000<br>Allen,Price,San Mateo,Burlingame,Sales Person,2500000<br>Beth,Johnson,San Francisco,San Francisco,Broker/Sales Person,7500000<br>';
  res.format({
    'text/html': function () {
      res.send(`<div>${csv}</div><form action="http://127.0.0.1:3000/" method="POST">
        <input
          id="input"
          type="text-area"
          name="jsonData"
          placeholder="paste data here"
        />
        <button type="submit">Submit</button>
      </form>`);
    }
  });
  res.end();
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

// The server must flatten the JSON hierarchy,
//  mapping each item / object in the JSON to a single line of CSV report(see included sample output),
//  where the keys of the JSON objects will be the columns of the CSV report.

// You may assume the JSON data has a regular structure and hierarchy (see included sample file).

// In other words,
//  all sibling records at a particular level of the hierarchy will have the same set of properties,
//  but child objects might not contain the same properties.

// In all cases, every property you encounter must be present in the final CSV output.

// You may also assume that child records in the JSON will always be in a property called `children`.
