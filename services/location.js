const StoreLocation = require("../models/location");

const S_location = {

    addLocation: async (name, lat, lng)=> {

        const location = new StoreLocation({
            name,
            lat,
            lng
        });
        return await location.save()
    },

    addLocationsFromData: async (locations) => {
        try {
          const insertPromises = locations.map(async (location) => {
            const { name, lat, lng } = location;
            const newLocation = new StoreLocation({
              name,
              lat,
              lng,
            });
            await newLocation.save();
          });
    
          await Promise.all(insertPromises);
          return { message: 'Locations added from data successfully' };
        } catch (e) {
          console.error(e);
          throw e;
        }
      },

    getLocationByNameSearch: async (name) => {
        return await StoreLocation.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
    },

    updateLocation: async (location)=> {
        return await StoreLocation.findOneAndUpdate({ _id: location._id }, location);
    },

    deleteLocation: async (_id)=> {
        return await StoreLocation.findOneAndDelete({ _id });
    },
    
    getAll: async ()=> {
        return await StoreLocation.find({})
    },
}

module.exports = S_location;