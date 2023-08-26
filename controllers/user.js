const StoreUser = require('../models/user');
const S_user = require('../services/user');

const C_user = {
  // returns all Users without the id of each user
getAll : async ()=> {
  try {
    return await S_user.getAll();
}
catch (e) {
    console.log(e);
}
},

getUserById: async (_id) => {
  try {
    return await S_user.getUserById(_id);
  } catch (e) {
    console.log(e);
    throw e;
  }
},

updateUser :  async (user)=> {
  try{
    return await S_user.updateUser(user);
  }
  catch (e){
    console.log(e);
  }
},

getUserByNameSearch : async (name)=> {
  try {
    if(name)
        return await S_user.getUserByFirstNameSearch(name);
    return await S_user.getAll();
} catch (e) {
    console.log(e);
}
},

findUserByEmailAndPassword: async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await S_user.findUserByEmailAndPassword(email, password);
    if (user) {
      return res.json({ message: 'User found', user: user });
    } else {
      return res.json({ message: 'User not found - Invalid email or password' });
    }
  } catch (e) {
    console.error("Error finding user by email and password:", e);
    return res.status(500).json({ message: 'An error occurred during search.' });
  }
},

findUserByEmail: async (email) => {
  try {
      if (email) {
          const user = await S_user.findUserByEmail(email);
          if (user) {
              return user; // Return the user if found
          } else {
              return { message: 'User not found' }; // Return a message if user is not found
          }
      } else {
          return await S_user.getAll(); // Return all users if no email provided
      }
  } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
  }
},


deleteUser : async (_id)=> {
  try {
    return await S_user.deleteUser(_id);
} catch (e) {
    console.log(e);
}
},

register: async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await S_user.checkIfEmailExists(email);
    if (existingUser) {
      console.log("email check returned true");
      return res.json({ message: 'Email already in use' });
    }
    console.log("enered creating user after email check");
    await S_user.addUser(name, email, password);
    req.session.email = email;
    req.session.type = 'basic';
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.log('Error registering user:', error.message, error);

    console.error('Error registering user:', error.message, error);
  
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: 'Email already in use' });
    }
  
    res.status(500).json({ message: 'An error occurred during registration.' });
  
  }
},

login: async (req, res) => {
  const { email, password } = req.body; 
  try {
    const user = await S_user.findUserByEmailAndPassword(email, password);

    if (user) {
      req.session.isLoggedIn = true;
      req.session.userId = user._id;
      req.session.userEmail = email; // -------------check --------------
      req.session.type = user.isManager ? 'admin' : 'basic';
      return res.json({ message: 'User authenticated', user: user });
    } else {
      return res.json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
},

logout: async (req, res) => {
  await req.session.destroy(() => {
      res.json({ message: "Logged out successfully." });
  });

}
}
module.exports = C_user;