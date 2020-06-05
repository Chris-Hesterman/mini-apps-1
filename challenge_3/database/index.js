const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost/checkout', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

    const addPurchase = (document, id) => {
      console.log('document from front end: ', document);
      console.log('id from front end: ', id);
      if (id) {
        return new Promise((resolve, reject) => {
          Purchases.updateOne(
            { _id: id },
            { $set: document },
            { new: true, upsert: true },
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            }
          );
        });
      } else {
        return new Promise((resolve, reject) => {
          Purchases.collection.insertOne(document, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      }
    };

    module.exports.addPurchase = addPurchase;
  })
  .catch((err) => {
    console.log(err);
  });
