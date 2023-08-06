const StoreLocation = require('../models/location');

const S_location = require("../services/location");

const C_location = {

    // returns all Locations without the id of each Location
    getAll: async ()=> {
        return await S_location.getAll();
    },

    updateLocation: async (location)=> {
        return await S_location.updateBranch(location);
    },

    getLocationByNameSearch: async (name)=> {
        if(name)
            return await S_location.getBranchByNameSearch(name);
        return await S_location.getAll();
    },

    deleteLocation: async (_id)=> {
        return await S_location.deleteBranch(_id);
    },

    /*
    addLocation: async (name,lat,lng)=> {
        try{
            return await S_location.addBranch(name,lat,lng);
        }
        catch(e){
            console.log(e);
            res.json({error:e});
        }
    },
    */


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

      
    };


module.exports = C_location;