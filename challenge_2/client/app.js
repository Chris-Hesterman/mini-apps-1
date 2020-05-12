const samples = JSON.stringify({
  firstName: 'Joshie',
  lastName: 'Wyattson',
  county: 'San Mateo',
  city: 'San Mateo',
  role: 'Broker',
  sales: 1000000,
  children: [
    {
      firstName: 'Beth Jr.',
      lastName: 'Johnson',
      county: 'San Mateo',
      city: 'Pacifica',
      role: 'Manager',
      sales: 2900000,
      children: [
        {
          firstName: 'Smitty',
          lastName: 'Won',
          county: 'San Mateo',
          city: 'Redwood City',
          role: 'Sales Person',
          sales: 4800000,
          children: []
        },
        {
          firstName: 'Allen',
          lastName: 'Price',
          county: 'San Mateo',
          city: 'Burlingame',
          role: 'Sales Person',
          sales: 2500000,
          children: []
        }
      ]
    },
    {
      firstName: 'Beth',
      lastName: 'Johnson',
      county: 'San Francisco',
      city: 'San Francisco',
      role: 'Broker/Sales Person',
      sales: 7500000,
      children: []
    }
  ]
});
window.onload = function () {
  var getStuff = async () => {
    const response = await fetch('http://127.0.0.1:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: samples
    });
    return response;
  };

  getStuff()
    .then((response) => console.log('response', response))
    .catch((err) => {
      console.log(err);
    });
};
