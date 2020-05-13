class CSVGenerator {
  constructor() {
    this.postData = this.postData.bind(this);
  }
  async postData(data) {
    const response = await fetch('http://127.0.0.1:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    return response;
  }
}

let CSV = new CSVGenerator();

$('form').on('submit', (e) => {
  e.preventDefault();
  let input = $('input');
  // console.log(data);
  CSV.postData(input.val())
    .then((data) => data.json())
    .then((results) => {
      input.val('');
      console.log(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

// CSV.postData(data)
//   .then((response) => console.log('response', response))
//   .catch((err) => {
//     console.log(err);
//   });
