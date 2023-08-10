const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const S_user={
    addUser: async (name, email, password)=> {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            name,
            email,
            password: hashedPassword, 
        });
        return await user.save()
    },
    getUserByNameSearch: async (name) => {
        return await User.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
    },

    findUserByEmailAndPassword: async (email, password) => { // log in function
        const user = await User.findOne({ email });
        
        if (user) {
            console.log("email found");
            const passwordMatches = await bcrypt.compare(password, user.password);
            
            if (passwordMatches) {
                console.log("match found");
                return user; // Successfully authenticated
            } else {
                console.log("pass doesnt match");
                return null; // Invalid password
            }
        } else {
            console.log("email not found");
            return null; // User not found
        }
    },
    
    checkIfEmailExists: async (email) => {
        const user = await User.findOne({ email });
        return user !== null;
    },

    updateUser: async (user)=> {
        return await User.findOneAndUpdate({ _id: user._id }, user);
    },

    deleteUser: async (_id)=> {
        return await User.findOneAndDelete({ _id });
    },

    getAll: async ()=> {
        return await User.find({})
    },
}

module.exports = S_user;