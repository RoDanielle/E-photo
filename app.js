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

const app = express(); // Initialize the 'app' variable here
//app.set('view engine', 'ejs'); // might not be neede (added when trying to fix the map)

const session = require('express-session');


// --- routes paths ---
//const Orders = require('./routes/R_order');
const Products = require('./routes/products');
const R_Location = require('./routes/location');
const Users = require('./routes/user');
const LogIn = require('./routes/login');
const ShoppingCart = require('./routes/shoppingCart');
const weatherRoutes = require('./routes/weather');

// --- models paths ---
const Product = require('./models/product');
const M_Location = require('./models/location');
const User = require('./models/user');
const Shopping_Cart = require('./models/shoppingCart');

// --- data paths ---
const productsData = require('./data/products');
const D_location = require('./data/location');
const userData = require('./data/user');

// --- controllers paths ---
const C_location = require('./controllers/location');
const C_products = require('./controllers/products');
const C_shoppingCart = require('./controllers/shoppingCart');


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
//Analyst json data 
//app.use(bodyParser.json());
app.use(express.json());
app.use('/locations', R_Location);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


//////////ADDING DATA ------------------------------ DO NOT DELETE!!!!!!!!!!!!!!!!!!! ----------------------

// save the store locations data to the MongoDB collection - using post 
(async () => {
  try {
    const existinLocationgData = await M_Location.find();
    if (existinLocationgData.length === 0) {
      await C_location.addLocationsFromData(D_location);
      console.log('Initial location data added to the database');
    } else {
      console.log('Location Data already exists in the database');
    }
  } catch (error) {
    console.error('Error checking or adding initial location data:', error);
  }
})();

// save the products data to the MongoDB collection - using post 
(async () => {
  try {
    const existinProductData = await Product.find();
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
  const { name, email, password } = req.body;

  try {
    // Create a new user document
    const newUser = new User({
      name,
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



// --- google map ---

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
console.log('Process Environment:', process.env); // delete after fixing
const encodedApiKey = encodeURIComponent(apiKey); // delete after fixing
console.log('API Key enco:', encodedApiKey); // Check if the API key is loaded correctly - delete after fixing
console.log('API Key:', apiKey); // Check if the API key is loaded correctly
app.get('/contacts.html', (req, res) => {
  res.render('contacts', { encodedApiKey }); // change encodedApiKey to apiKey after fixing
});


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
app.use(ShoppingCart);
app.use( Products);
app.use(R_Location);
app.use(Users);
app.use(LogIn);
app.use(weatherRoutes);
app.use('/controllers', express.static('controllers'));
app.use('/routes', express.static('routes'));
app.use('/views', express.static('views'));
app.use('/services', express.static('services'));
app.use('/views/assets', express.static('assets'));
app.use('/views/assets/js', express.static('js'));
app.use(express.static('public'));




//web socket 
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4440 });

wss.on('connection', (ws) => {
  console.log('A new client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'message') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', data: data.data }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port 4440');