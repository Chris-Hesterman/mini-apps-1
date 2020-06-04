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
      console.log('database id: ', id);
      // let filter = { document };
      // let options = { new: true, upsert: true };

      return new Promise((resolve, reject) => {
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
