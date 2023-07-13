import express from "express";
import { signUpController, loginController, emailConfirmationHandler, resetPasswordController, changePasswordController, PasswordRecoveryController, getUsers } from "../controllers/userControllers.js"
import { singleProfileDetails, updateProfileController } from "../controllers/profileControllers.js"
import {authorizationHandler} from "../middlewares/authorization.js"
import {passwordConfirmHandler} from "../middlewares/passwordConfirmHandler.js"
import {auth} from "../middlewares/auth.js"


const router = express.Router()


router.post("/signup", passwordConfirmHandler, signUpController)
router.get('/confirm-email/:token', emailConfirmationHandler)
router.post("/login", loginController)
router.get('/profile-details', authorizationHandler, singleProfileDetails)
router.put("/update-profile",  authorizationHandler,  updateProfileController)
router.post("/reset-password", resetPasswordController)
router.put("/reset-password", PasswordRecoveryController)
router.put("/change-password", authorizationHandler, changePasswordController)
router.get("/getUsers", auth, getUsers);



export default router