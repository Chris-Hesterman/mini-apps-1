const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const port = 3000;

app.use(express.static('client'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Hey There World');
});

app.post('/', upload.single('jsonData'), (req, res, next) => {
  var flattenJSON = (obj) => {
    console.log(obj.children);
    let results = [];

    var helper = (obj) => {
      let children = obj.children;

      delete obj.children;
      results.push(obj);
      for (let child of children) {
        helper(child);
      }
    };
    helper(obj);

    return results;
  };

  var getReport = (array) => {
    let headersObj = {};
    let results;

    for (let item of array) {
      let keys = Object.keys(item);
      for (let key of keys) {
        if (!headersObj[key] && key !== 'children') {
          headersObj[key] = key;
        }
      }
    }
    results = Object.keys(headersObj).join(',') + '<br>';
    for (let record of array) {
      let statsArray = Object.values(record);
      results += statsArray.join(',') + '<br>';
    }

    return results;
  };

  let objFromJSON = JSON.parse(req.file.buffer.toString());
  let flat = flattenJSON(objFromJSON);
  let csv = getReport(flat);

  res.format({
    'text/html': function () {
      res.send(`<div>${csv}</div><form action="http://127.0.0.1:3000/" method="POST" enctype="multipart/form-data">
        <input
          id="input"
          type="file"
          accept=".json"
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
