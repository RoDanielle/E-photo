const S_location = require("../services/location");

const C_location = {

    // returns all Locations without the id of each Location
    getAll: async ()=> {
        return await S_location.getAll();
    },

    updateLocation: async (location)=> {
        return await S_location.updateLocation(location);
    },

    getLocationByNameSearch: async (name)=> {
        if(name)
            return await S_location.getLocationByNameSearch(name);
        return await S_location.getAll();
    },
    getLocationById: async (_id) => {
      try {
        return await S_location.getLocationById(_id);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    deleteLocation: async (_id)=> {
        return await S_location.deleteLocation(_id);
    },
    
    // manually 
    addLocation: async (name, lat, lng) => {
      try {
        return await S_location.addLocation(name, lat, lng);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    // from data file
    addLocationsFromData: async (locations) => {
        try {
          const result =  await S_location.addLocationsFromData(locations);
            return { message: result.message};
          } catch (e) {
            console.error(e);
            throw e;
          }
      },
    };


module.exports = C_location;