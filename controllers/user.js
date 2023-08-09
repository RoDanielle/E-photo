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

findUserByEmailAndPassword: async (email, password) => { // change this according to the login logic we want
  try {
    const user = await S_user.getUserByEmailAndPass(email, password);

    if (user) {
      // User authenticated
      // You might want to return some useful information about the user here
      return { message: 'User authenticated', user: user };
    } else {
      // Invalid email or password
      return { error: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return { error: 'An error occurred while finding user' };
  }
},


findUserByEmail : async (email) => {
  try {
    if(email)
        return await S_user.findUserByEmail(email);
    return await S_user.getAll();
} catch (e) {
    console.error("Error finding user by email:", error);
    console.log(e);
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
    console.log("endered creating user after email check");
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
}
}

module.exports = C_user;





/*
const userController = {
  
    logout: async (req, res) => {
        await req.session.destroy(() => {
            res.json({ message: "Logged out successfully." });
        });
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await userService.getUserByEmailAndPass(email, password);
        if (user) {
            req.session.email = user.email;
            req.session.type = user.type;
            res.json({ message: "Logged in successfully." });
        }
        else
            res.status(401).json({ error: "Invalid credentials." });
    },

}
*/


 

/*
// returns all Users without the id of each user
const getAll = async ()=> {
  return await S_user.getAll();
}

const updateUser =  async (user)=> {
  return await S_user.updateUser(user);
}

const getUserByNameSearch = async (name)=> {
  if(name)
      return await S_user.getUserByFirstNameSearch(name);
  return await S_user.getAll();
}

const deleteUser =  async (_id)=> {
  return await S_user.deleteUser(_id);
}


 const addUser = async (name, email, password)=> {
  try{
    const newUser=new StoreUser({
      name, 
      email,
      password,
    });
      await newUser.save();
      return{message: 'User added successfully', user: newUser };
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

// from data file
const addUserFromData= async (users) => {
  try {
    const insertPromises = users.map(async (user) => {
      const { name, email, password } = user;
      const newUser = new StoreUser({
        name,
        email,
        password,
      });
      await newUser.save();
    });

    await Promise.all(insertPromises);

    return { message: 'Users added from data successfully' };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = {
    getAll,
    updateUser,
    getUserByNameSearch,
    deleteUser,
    addUser,
    addUserFromData,
}
*/