import userModel from "../models/userModel.js";
import profileModel from "../models/profileModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import {emailSender} from "../utils/emailSender.js"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export const signUpController = async (req, res, next) => {
   try {

      const { name, email, password } = req.body

      // check if that email is already saved in DB.
      const alreadyExist = await userModel.findOne({ email: email });
      if (alreadyExist !== null) {
         const err = new Error("Email already registered");
         err.status = 400;
         throw err;
      }

      const saltRounds = 11
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = new userModel({
         name,
         email,
         hashedPassword
      });

      const newUser = await user.save();


      newUser.hashedPassword = undefined;


      const profile = new profileModel({
         owner: newUser._id,
         name: newUser.name,
         email: newUser.email
      })

      const newProfile = await profile.save();


//Generating a token that we want to pass in email, to verify a user's email address.
      const payload = {
         name: name,
         email: email,
         userId: newUser._id
       };

       const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 2*60*60 });

 // Declaring the variables that we can pass to the function that is responsible for sending the email
       const subject = "Email Verification";
       const plainText = `  Dear ${name} ! We have received your request to register by our Gift Shop. Please follow
           the link to verify your email:  http://localhost:3000/confirm-email/${token}`;
   
       const htmlText = `
               <h2>Dear ${name}!</h2>
               <p>We have received your request to register by our Gift Shop. Please follow
               the link to verify your email:
                   <a href= "http://localhost:3000/confirm-email/${token}">Click Here! </a>
               </p>`;
   // calling the function emailSender to send an email to the user.
       const emailStatus = await emailSender(
         email,
         subject,
         plainText,
         htmlText
       );
  
       if (!emailStatus) {
         const err = new Error("Failed to send email to the user to verify his account.");
         throw err;
       }


      res.status(201).json("You have registered successfully.");
   } catch (err) {
      next(err);
   }
};

// To confirm the user's email
export const emailConfirmationHandler = async (req, res) => {
   try {

     const { token } = req.params;
     const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
     const {email} = decodedData

     const result = await userModel.findOne({email: email})
     result.verified = true
     await result.save()


     res.status(200).send("Email verified successfully");
   } catch (err) {
     res.status(401).send("Your Email is not valid or the token is expired.");
   }
 };



export const loginController = async (req, res, next) => {
   try {
      const { email, password } = req.body

      const userDataFromDB = await userModel.findOne({ email })

      if (userDataFromDB === null) {
         const err = new Error("Invalid Credentials");
         err.status = 400;
         throw err;
      }

      const hashedPassword = userDataFromDB.hashedPassword;

      const isValid = await bcrypt.compare(password, hashedPassword);

       // Checking either the user has confirmed his email address or not

    if (!userDataFromDB.verified)
    return res.status(400).send("Please confirm your email first!");

      if (isValid)  {
   
      const payload = {
        email: email,
        name: userDataFromDB.name,
        userId: userDataFromDB._id
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY);

           res
        .status(201)
        .json({
          message: `Hi ${payload.name}, you are logged in successfully.`,
          token: token,
          name: userDataFromDB.name,
          userId: userDataFromDB._id,
          email:  userDataFromDB.email,
        })}
      else {
         const err = new Error("Invalid Credentials");
         err.status = 400;
         throw err;
      }
   } catch (err) {
      next(err)
   }

}


/* export const updateUserController = async (req, res, next) => {
  const _id = req.params._id; */

/*  const alreadyExist = await userModel.findOne({_id: id});
 if (alreadyExist !== null) {
   const err = new Error("Email already registered");
   err.status = 400;
   throw err;
 } */

/*  const updatedKeys = Object.keys(req.body);
 let updatedObj = { socialMediaLinks: {} };
 const socialLinksArr = [
   "twitterUsername",
   "gitHubUsername",
   "linkedInUsername",
   "discordUsername",
   "youTubeChannel",
   "website",
 ]; */

/* updatedKeys.forEach((key) => {
  if (socialLinksArr.includes(key)) {
    updatedObj.socialMediaLinks[key] = req.body[key];
  } else {
    updatedObj[key] = req.body[key];
  }
});
*/
/*   try {
    await userModel.findByIdAndUpdate(_id, updatedObj, {new: true})
    res.send("Your Profile is updated.");
  } catch (err) {
    next(err);
  }
}; */
