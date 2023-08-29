const S_location = require("../services/location");

const C_location = {

    // get all locations
    getAll: async ()=> {
      try{
        return await S_location.getAll();

      }catch (e) {
        console.log(e);
        throw e;
      }
    },

    // update location info
    updateLocation: async (locationId,updatedLocationData)=> {
        try {
          const updatedLocation = await S_location.updateLocation(locationId, updatedLocationData);
          return updatedLocation;
      } catch (e) {
          console.log(e);
          throw e;
      }
    },

    // get a location by its name
    getLocationByNameSearch: async (name)=> {
        if(name)
            return await S_location.getLocationByNameSearch(name);
        return await S_location.getAll();
    },

    // get a location by its id
    getLocationById: async (_id) => {
      try {
        return await S_location.getLocationById(_id);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    // delete a location
    deleteLocation: async (_id)=> {
      try{
        return await S_location.deleteLocation(_id);
      }
      catch(e){
        console.log(e);
        throw e;
      }
    },
    
    // add a location manually (for admin) 
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