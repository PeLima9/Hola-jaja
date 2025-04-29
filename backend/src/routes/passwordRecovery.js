//Imports
import express from "express";
import passRecoveryController from "../controllers/passRecoveryController.js";

//Router
const router = express.Router();

//Routes
router.route("/requestCode").post(passRecoveryController.requestCode);
router.route("/verifyCode").post(passRecoveryController.verifyCode);
router.route("/resetPassword").post(passRecoveryController.newPassword);

//Export
export default router;