import profileModel from "../models/profileModel.js";

/* export const createProfileController = async (req, res, next) => {
   try {
      const owner = req.userId; // getting the owner (user) objectId from the req.params from the FE
console.log(owner);
      const {
         name,
         biography,
         location,
         twitterUsername,
         gitHubUsername,
         linkedInUsername,
         discordUsername,
         youTubeChannel,
         website,
      } = req.body;

      // check if the user has already a profile
    const alreadyExist = await profileModel.findOne({ owner: owner });
    if (alreadyExist !== null) {
      const err = new Error("You have already a profile");
      err.status = 400;
      throw err;
    }

      const profile = new profileModel({
         owner: owner,
         name,
         biography,
         location,
         twitterUsername,
         gitHubUsername,
         linkedInUsername,
         discordUsername,
         youTubeChannel,
         website,
      });

      const newProfile = await profile.save();

      res.status(201).send("Your profile has been created.");
   } catch (err) {
      next(err);
   }
}; */



export const singleProfileDetails = async (req, res, next) => {
   try{
       const owner = req.userId
       console.log(owner);
       const result = await profileModel.findOne({owner: owner})

       res.status(200).json(result)
   }
   catch(err){
       next(err)
   }

} 


export const getAllProfilesController = async (req, res, next) => {

   try {
     const result = await profileModel.find();
console.log("BE profile", result);
     res.status(200).json(result);
   } catch (err) {
     next(err);
   }
 };



export const updateProfileController = async (req, res, next) => {
   try{    

      
     const {name, email, location} = req.body 

      const bodyOfRequest = {
         name,
         email,
         location
      }
      console.log("bodyOfRequest",bodyOfRequest);
      const updateData = {}
      /* Looping through the newly created object bodyOfRequest to check which field need to be updated on database */
      for (const [key, value] of Object.entries(bodyOfRequest)){
          if(value) {updateData[key] = value}
      }
     console.log("updateData",updateData);
      const result = await profileModel.findOneAndUpdate({owner: req.userId}, updateData)
      res.status(201).send("Your profile has been updated successfully")
  }
  catch(err) {
      next(err)
  }
}
