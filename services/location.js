const StoreLocation = require("../models/location");

const S_location = {

    // add a new location
    addLocation: async (name, lat, lng)=> {
        const location = new StoreLocation({
            name,
            lat,
            lng
        });
        return await location.save()
    },

    // add locations from data file
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

    // get a location by its name
    getLocationByNameSearch: async (name) => {
        return await StoreLocation.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
    },

    // update a locations info
    updateLocation: async (locationId, updatedLocationData) => {
      try {
          // Find the location by its ID and update its fields
          const updatedLocation = await StoreLocation.findByIdAndUpdate(locationId, updatedLocationData, { new: true });
          return updatedLocation;
      } catch (e) {
          console.error(e);
          throw e;
      }
  },  

  // delete a location
  deleteLocation: async (_id)=> {
      return await StoreLocation.findOneAndDelete({ _id });
  },
    
  // get all locations
  getAll: async ()=> {
      return await StoreLocation.find({})
  },

  // get a location by its id
  getLocationById: async (locationId) => {
    try {
      // Query the database to retrieve the location by its ID
      const location = await StoreLocation.findById(locationId);
      return location; // Return the retrieved product or null if not found
    } catch (error) {
      console.error('Error fetching location by ID:', error);
      throw error;
    }
  },
}

module.exports = S_location;