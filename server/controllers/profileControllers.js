import profileModel from "../models/profileModel.js";
import googleProfileModel from "../models/googleProfileModel.js";


export const singleProfileDetails = async (req, res, next) => {
   try{

    if (req.localData) {
       
        const result = await profileModel.findOne({owner: req.localData.userId})
        res.status(200).json(result) 

    } else if (req.googleData) {
        res.status(200).json(req.googleData)
    }

   }
   catch(err){
       next(err)
   }

} 


export const updateProfileController = async (req, res, next) => {
   try{    
     const {name, location, interests} = req.body 

      const bodyOfRequest = {
         name,
         location,
         interests
      }
     
      const updateData = {}
      /* Looping through the newly created object bodyOfRequest to check which field need to be updated on database */
      for (const [key, value] of Object.entries(bodyOfRequest)){
          if(value) {updateData[key] = value}
      }
    
       if (req.localData) {
        const result = await profileModel.findOneAndUpdate({owner: req.localData.userId}, updateData)
        res.status(201).send("Your profile has been updated successfully")

    } else if (req.googleData && !await googleProfileModel.findOne({owner: req.googleData.userId})) {
        const googleProfile = new googleProfileModel({
            owner: req.googleData.userId,
            ...updateData
          });
          const newProfile = await googleProfile.save();
          res.status(201).send("Your profile has been updated successfully")
    } else {
        const result = await googleProfileModel.findOneAndUpdate({owner: req.googleData.userId}, updateData)
        res.status(201).send("Your profile has been updated successfully")
    } 
  }
  catch(err) {
      next(err)
  }
}
