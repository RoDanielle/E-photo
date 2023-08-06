const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//const Orders = require('./routes/R_order');
const Products = require('./routes/products');
const Locations = require('./routes/location');
const Users = require('./routes/user');
const LogIn = require('./routes/login');


const passport=require("passport");
const { loginCheck }=require("./auth/passport");
loginCheck(passport);

const customEnv = require('custom-env');
const path = require('path'); 
customEnv.env(process.env.NODE_ENV, './config');

const Product = require('./models/product');
const Location = require('./models/location');
const User = require('./models/user');


const productsData = require('./data/products');
const locationsData = require('./data/location');
//const importProducts = mongoose.model('Product', Product);?????
const userData = require('./data/user');

const C_location = require('./controllers/location');

const app = express(); // Initialize the 'app' variable here
//app.set('view engine', 'ejs'); // might not be neede (added when trying to fix the map)

const session = require('express-session');


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




//BodyParsing: This built-in express middleware gives us the ability to process posted data and store it in the req.body.
//app.use(express.urlencoded({extended: false}));

app.use(session({
  secret:'oneboy',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/views/'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/locations', Locations);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});




//////////ADDING DATA ------------------------------ DO NOT DELETE!!!!!!!!!!!!!!!!!!! ----------------------

// save the store locations to the MongoDB collection - using post 
(async () => {
  try {
    const existingData = await Location.find();
    if (existingData.length === 0) {
      await C_location.addLocationsFromData(locationsData);
      console.log('Initial location data added to the database');
    } else {
      console.log('Location Data already exists in the database');
    }
  } catch (error) {
    console.error('Error checking or adding initial location data:', error);
  }
})();

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
*/

/*
// Save the users array to the MongoDB collection
User.insertMany(userData)
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

// ** testing - tring to enter data  try to play with that 
/*
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Insert user into the 'users' collection
  users.push({ username, email, password });

  res.status(200).send('User registered successfully.');
});
*/

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user document
    const newUser = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).send('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('An error occurred during registration.');
  }
});




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
app.use(Users);
app.use(LogIn);
app.use('/controllers', express.static('controllers'));
app.use('/routes', express.static('routes'));
app.use('/views', express.static('views'));
app.use('/services', express.static('services'));
app.use('/views/assets', express.static('assets'));
app.use('/views/assets/js', express.static('js'));
app.use(express.static('public'));
