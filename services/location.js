const Location = require("../models/location");

const S_location = {

    addBranch: async (name, lat, lng)=> {

        const location = new Location({
            name,
            lat,
            lng
        });
        return await branch.save()
    },

    getLocationByNameSearch: async (name) => {
        return await Location.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
    },

    updateLocation: async (location)=> {
        return await Location.findOneAndUpdate({ _id: location._id }, location);
    },

    deleteLocation: async (_id)=> {
        return await Location.findOneAndDelete({ _id });
    },
    
    getAll: async ()=> {
        return await Location.find({})
    },
}

module.exports = S_location;