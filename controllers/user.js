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
      return await S_user.addUser(name, email, password);
  }
  catch(e){
      console.log(e);
      res.json({error:e});
  }
}

module.exports = {
    getAll,
    updateUser,
    getUserByNameSearch,
    deleteUser,
    addUser,
}
