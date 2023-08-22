/*
In order to add users to Mongo before the protection, it is necessary to enter them through registration through the website and not through the server itself, 
we need to have an ADMIN type user, and a few more generic users, we will use this file for the purpose of documenting - users and their passwords .
The passwords in Mongo are with HASH.
*/

const users = [
    {
      name: "Dana Levi",
      email: "danalevi@gmail.com",
      password: "1234",
    },
    {
        name: "Noam Cohen",
        email: "noamcohen@gmail.com",
        password: "noam9999",
    },
    {
      name: "Daniel Hay",
      email: "daniel@gmail.com",
      password: "daniel654",
      description:"love to eat , sleep , and repeat",
      location:"Tel Aviv",
  },
  {
    name: "Yarden Hay",
    email: "Yarden@gmail.com",
    password: "Yarden123",
    description:"love to eat , sleep , and repeat again",
    location:"Tel Aviv",
    isManager:"true",
},


];
  
module.exports = users;