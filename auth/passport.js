/*

The provided code file implements local authentication using Passport.js for a web application. 
It defines a function, loginCheck, responsible for configuring a local authentication strategy. 
This strategy verifies user login credentials by checking if a user with the provided email exists,
and then compares the hashed password with the user's stored hashed password using bcrypt for security. 
If the authentication is successful, user details are passed to the done callback. 
The file also includes serialization and deserialization functions, enabling user session management. 
Overall, the code ensures secure user authentication and session handling within the application.

*/

/*
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
// Load model
const User = require("../models/user");

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Check customer
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("wrong email");
            return done();
          }
          // Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done();
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );

  // Serialization and deserialization functions for passport
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginCheck,
};
*/
