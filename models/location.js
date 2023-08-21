/*
The code defines a Mongoose schema and model for storing information about store locations. 
This schema describes the structure and attributes of a store location document that will be stored in a MongoDB database.
*/

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