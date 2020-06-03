const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost/checkout', {
  useNewUrlParser: true
});

connection
  .then((db) => {
    console.log('mongoose connected!');

    let purchaseSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
      tel: String,
      cardNum: String,
      expDate: String,
      cvv: String,
      billingZIP: String
    });

    let Purchases = mongoose.model('Purchase', purchaseSchema);

    const addPurchase = (document) => {
      Purchases.collection.insertOne(document, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('transaction added');
      });
    };
    module.exports.addPurchase = addPurchase;
  })
  .catch((err) => {
    console.log(err);
  });
