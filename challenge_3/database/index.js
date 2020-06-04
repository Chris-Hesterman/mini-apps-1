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

    const addPurchase = (document, id) => {
      if (id) {
        let filter = { _id: id };
        return new Promise((resolve, reject) => {
          Purchases.findOneAndUpdate(filter, { document }, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          Purchases.collection.save(document, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      }

      return new Promise((resolve, reject) => {
        Purchases.update(filter, document, options, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
        // Purchases.collection.updateOne(
        //   filter,
        //   { $set: document },
        //   options,
        //   (err, result) => {
        //     if (err) {
        //       reject(err);
        //     }
        //     resolve(result);
        //   }
        // );
      });
    };
    module.exports.addPurchase = addPurchase;
  })
  .catch((err) => {
    console.log(err);
  });
