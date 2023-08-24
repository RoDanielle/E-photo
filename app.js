// Importing required modules and setting up environment variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport=require("passport");
const { loginCheck }=require("./auth/passport");
loginCheck(passport);
const customEnv = require('custom-env');
const path = require('path'); 
customEnv.env(process.env.NODE_ENV, './config');

// Initialize Express app
const app = express(); 
const session = require('express-session');

// --- routes paths ---
//const R_Orders = require('./routes/R_order');
const R_AuthRoutes = require('./routes/authRoutes');
const R_Products = require('./routes/products');
const R_Location = require('./routes/location');
const R_Users = require('./routes/user');
const R_ShoppingCart = require('./routes/shoppingCart');
const R_Weather = require('./routes/weather');

// --- models paths ---
//const M_User = require('./models/user');
//const M_ShoppingCart = require('./models/shoppingCart');
const M_Product = require('./models/product');
const M_Location = require('./models/location');

// --- controllers paths ---
//const C_shoppingCart = require('./controllers/shoppingCart');
const C_location = require('./controllers/location');
const C_products = require('./controllers/products');

// --- data paths ---
//const userData = require('./data/user');
const productsData = require('./data/products');
const locationData = require('./data/location');

// --- Mongo DB connection ---
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
connectToMongoDB();

// Set up session and authentication
const sessKey = process.env.SESSION_KEY
app.use(session({
  secret: sessKey,
  resave: false, // Set to false to save only if changes were made
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// --- google map ---
const fs = require('fs'); // Import the 'fs' module

// Middleware to inject the Google Maps API key
app.use('/', (req, res, next) => {
  if (req.url === '/contacts.html') {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
    const filePath = './views/contacts.html'; // Update with the correct file path

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the contacts.html file with utf8 encoding
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading HTML file:', err);
          res.status(500).send('Error reading HTML file.');
        } else {
          // Replace the placeholder with the actual API key
          const modifiedData = data.replace('API_KEY_PLACEHOLDER', apiKey);
          // Log the modified data (for debugging purposes)
          res.send(modifiedData);
        }
      });
    } else {
      console.error('HTML file does not exist:', filePath);
      res.status(404).send('HTML file not found.');
    }
  } else {
    next();
  }
});

// Set up static assets and middleware
app.use(express.static(__dirname + '/views/'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Analyst json data 
//app.use(bodyParser.json());

// Serve index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// Automatically add location data if not already present
//locations  
(async () => {
  try {
    const existinLocationgData = await M_Location.find();
    if (existinLocationgData.length === 0) {
      const result = await C_location.addLocationsFromData(locationData);
      console.log(result.message);
    } else {
      console.log('Location Data already exists in the database');
    }
  } catch (error) {
    console.error('Error checking or adding initial location data:', error);
  }
})();
//products
(async () => {
  try {
    const existinProductData = await M_Product.find();
    if (existinProductData.length === 0) {
      await C_products.addProductsFromData(productsData);
      console.log('Initial products data added to the database');
    } else {
      console.log('Products Data already exists in the database');
    }
  } catch (error) {
    console.error('Error adding initial products data:', error);
  }
})();
//users
/*
R_Users.insertMany(userData)
.then(() => {
  console.log('User data saved to MongoDB');
  //mongoose.disconnect(); // Close the connection after saving data
})
.catch((error) => {
  console.error('Error saving user data to MongoDB:', error);
  mongoose.disconnect(); // Close the connection on error
}).catch((error) => {
console.error('Error connecting to MongoDB:', error);
});
*/

// Routes
//app.use(R_Orders);
app.use(R_AuthRoutes);
app.use(R_ShoppingCart);
app.use(R_Products);
app.use(R_Location);
app.use(R_Users);
app.use(R_Weather);
app.use('/controllers', express.static('controllers'));
app.use('/routes', express.static('routes'));
app.use('/views', express.static('views'));
app.use('/services', express.static('services'));
app.use('/views/assets', express.static('assets'));
app.use('/views/assets/js', express.static('js'));
app.use(express.static('public'));


/*
app.get('/api/products', async (req, res) => {
  try {
    const products = await M_Product.find(); // Using the getAll function from C_products controller
    res.json(products);
  } catch (error) {
    console.log('hello')
  }
});
*/


// --- web socket - autoResponse ---
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4440 });
console.log('WebSocket server is running on port 4440');

wss.on('connection', (ws) => {
  console.log('A new client connected');
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'message') {
      // Check for automatic response
      const autoResponse = createAutoResponse(data.data);
      if (autoResponse) {
        ws.send(JSON.stringify({
          type: 'message',
          data: autoResponse,
          sender: 'ADMIN',
          autoResponse: true
        }));
      }
    }
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

//autoResponse 
function createAutoResponse(message) {

  if (message.toLowerCase().includes('order')) {
      return 'You can place an order through our website or contact us for assistance with your order.';
  } else if (message.toLowerCase().includes('product')) {
      return 'We offer a wide range of products in our store!';
  } else if (message.toLowerCase().includes('shipping')) {
      return 'We provide fast and convenient shipping services nationwide!';
  } else if (message.toLowerCase().includes('cancel order')) {
      return 'To cancel an order, please contact us and provide additional details.';
  } else {
      return "Please contact us at the following email address: e.photocont@gmail.com , with the relevant order details. Thank you";
  }
}