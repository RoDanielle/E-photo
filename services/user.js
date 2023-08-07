const User = require('../models/user')

const S_user={
    addUser: async (name, email, password)=> {
        const user = new User({
            name,
            email,
            password
        });
        return await branch.save()
    },
    getUserByNameSearch: async (name) => {
        return await User.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
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