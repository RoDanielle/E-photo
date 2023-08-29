const S_location = require("../services/location");

const C_location = {

    getAll: async ()=> {
        return await S_location.getAll();
    },

    updateLocation: async (locationId,updatedLocationData)=> {
        try {
          const updatedLocation = await S_location.updateLocation(locationId, updatedLocationData);
          return updatedLocation;
      } catch (e) {
          console.log(e);
          throw e;
    }
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
    
    // manually (for admin) 
    addLocation: async (name, lat, lng) => {
      try {
        return await S_location.addLocation(name, lat, lng);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    // add locations from data file
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