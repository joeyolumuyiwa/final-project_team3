import profileModel from "../models/profileModel.js";



export const singleProfileDetails = async (req, res, next) => {
   try{
       const owner = req.userId
       const result = await profileModel.findOne({owner: owner})

       res.status(200).json(result)
   }
   catch(err){
       next(err)
   }

} 


export const updateProfileController = async (req, res, next) => {
   try{    

      
     const {name, email, location} = req.body 

      const bodyOfRequest = {
         name,
         email,
         location
      }
     
      const updateData = {}
      /* Looping through the newly created object bodyOfRequest to check which field need to be updated on database */
      for (const [key, value] of Object.entries(bodyOfRequest)){
          if(value) {updateData[key] = value}
      }
    
      const result = await profileModel.findOneAndUpdate({owner: req.userId}, updateData)
      res.status(201).send("Your profile has been updated successfully")
  }
  catch(err) {
      next(err)
  }
}
