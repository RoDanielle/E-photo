/*
In order to add users to Mongo before the protection, it is necessary to enter them through registration through the website and not through the server itself, 
we need to have an ADMIN type user, and a few more generic users, we will use this file for the purpose of documenting - users and their passwords .
The passwords in Mongo are with HASH.
*/
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// Generate hashed passwords synchronously
const user1pass = bcrypt.hashSync('1234', saltRounds);
const user2pass = bcrypt.hashSync('noam9999', saltRounds);
const user3pass = bcrypt.hashSync('daniel654', saltRounds);
const user4pass = bcrypt.hashSync('Yarden123', saltRounds);
const user5pass = bcrypt.hashSync('admin12345', saltRounds);


const users = [
    {
      name: "Dana Levi",
      email: "danalevi@gmail.com",
      password: user1pass,
    },
    {
        name: "Noam Cohen",
        email: "noamcohen@gmail.com",
        password: user2pass,
    },
    {
      name: "Daniel Hay",
      email: "daniel@gmail.com",
      password: user3pass,
      description:"love to eat , sleep , and repeat",
      location:"Tel Aviv",
  },
  {
    name: "Yarden Hay",
    email: "Yarden@gmail.com",
    password: user4pass,
    description:"love to eat , sleep , and repeat again",
    location:"Tel Aviv",
    isManager:"true",
},
{
  name: "admin",
  email: "admin@gmail.com",
  password: user5pass,
  description:"love to eat , sleep , and repeat again",
  location:"Tel Aviv",
  isManager:"true",
},

];
  
module.exports = users;
