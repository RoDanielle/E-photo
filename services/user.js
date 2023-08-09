const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

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

    getUserByEmailAndPass: async (email, password) => { // need to change this with messages we would like for login 
        const user = await User.findOne({ email });
    
        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            
            if (passwordMatches) {
                return user; // Successfully authenticated
            } else {
                return null; // Invalid password
            }
        } else {
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