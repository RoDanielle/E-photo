const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//const Orders = require('./routes/R_order');
const Products = require('./routes/products');
const Locations = require('./routes/location');

const customEnv = require('custom-env');
const path = require('path'); 
customEnv.env(process.env.NODE_ENV, './config');

const Product = require('./models/product');
const Location = require('./models/location');

const productsData = require('./data/products');
const locationsData = require('./data/location');
//const importProducts = mongoose.model('Product', Product);?????

const app = express(); // Initialize the 'app' variable here
//app.set('view engine', 'ejs'); // might not be neede (added when trying to fix the map)



// Mongo DB connection
const database = process.env.CONNECTION_STRING // || 'mongodb://127.0.0.1:27017/proddb';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');

    // Start the server after the connection is successful
    const PORT = process.env.PORT // || 4111;
    app.listen(PORT, () => console.log('Server started on port: ' + PORT));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Call the function to connect to MongoDB
connectToMongoDB();


app.use(express.static(__dirname + '/views/'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});




//////////ADDING DATA ------------------------------ DO NOT DELETE!!!!!!!!!!!!!!!!!!! ----------------------
/*
 // Save the products array to the MongoDB collection
 Product.insertMany(productsData)
 .then(() => {
   console.log('Products data saved to MongoDB');
   //mongoose.disconnect(); // Close the connection after saving data
 })
 .catch((error) => {
   console.error('Error saving products data to MongoDB:', error);
   mongoose.disconnect(); // Close the connection on error
 }).catch((error) => {
console.error('Error connecting to MongoDB:', error);
});

// save the store locations to the MongoDB collection
 Location.insertMany(locationsData)
 .then(() => {
   console.log('Locations data saved to MongoDB');
  // mongoose.disconnect(); // Close the connection after saving data
 })
 .catch((error) => {
   console.error('Error saving locations data to MongoDB:', error);
   mongoose.disconnect(); // Close the connection on error
 }).catch((error) => {
console.error('Error connecting to MongoDB:', error);
});
*/

// google map

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
console.log('Process Environment:', process.env); // delete after fixing
const encodedApiKey = encodeURIComponent(apiKey); // delete after fixing
console.log('API Key enco:', encodedApiKey); // Check if the API key is loaded correctly - delete after fixing
console.log('API Key:', apiKey); // Check if the API key is loaded correctly
app.get('/contacts.html', (req, res) => {
  res.render('contacts', { encodedApiKey }); // change encodedApiKey to apiKey after fixing
});

/*
console.log('API Key:', process.env.GOOGLE_MAPS_API_KEY); // Check if the API key is loaded correctly

app.get('/api/google-maps-key', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});


// Route for serving contacts.html and injecting the API key
app.get('/contacts.html', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.sendFile(path.join(__dirname,'views', 'contacts.html')
    .replace('YOUR_GOOGLE_MAPS_API_KEY', apiKey));
});

*/

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Using the getAll function from C_products controller
    res.json(products);
  } catch (error) {
    console.log('hello')
  }
});


// Routes
//app.use( Orders);
app.use( Products);
app.use(Locations);
app.use('/controllers', express.static('controllers'));
app.use('/routes', express.static('routes'));
app.use('/views', express.static('views'));
app.use('/services', express.static('services'));
app.use('/views/assets', express.static('assets'));
app.use('/views/assets/js', express.static('js'));
app.use(express.static('public'));

