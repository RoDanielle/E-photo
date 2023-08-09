const StoreUser = require('../models/user');
const S_user = require('../services/user');

 
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