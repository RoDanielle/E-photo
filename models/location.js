const mongoose = require ('mongoose');

const storeLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

const StoreLocation = mongoose.model('StoreLocation', storeLocationSchema);  
module.exports = StoreLocation;