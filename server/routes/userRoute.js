import express from "express";
import { signUpController, loginController, emailConfirmationHandler, getUsers } from "../controllers/userControllers.js"
import { singleProfileDetails, updateProfileController, getAllProfilesController } from "../controllers/profileControllers.js"
import {authorizationHandler} from "../middlewares/authorization.js"
import {passwordConfirmHandler} from "../middlewares/passwordConfirmHandler.js"
import {auth} from "../middlewares/auth.js"

const router = express.Router()


router.post("/signup", passwordConfirmHandler, signUpController)
router.get('/confirm-email/:token', emailConfirmationHandler)
router.post("/login", loginController)
router.get('/profile-details', authorizationHandler, singleProfileDetails)
router.get("/get-all-profiles", authorizationHandler, getAllProfilesController)
router.put("/update-profile",  authorizationHandler,  updateProfileController)
router.get("/getUsers", auth, getUsers);


export default router